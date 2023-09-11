import { db } from "./database";
import { PersonUpdate, Pet, NewPerson, NewPet } from "./types";

export async function findPetbyId(id: number) {
  return await db
    .selectFrom("pet")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findPet(criteria: Partial<Pet>, includeOwner: boolean) {
  let query = db.selectFrom("pet");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must reassign.
  }

  if (criteria.name) {
    query = query.where("name", "=", criteria.name);
  }

  if (criteria.owner_id) {
    query = query.where("owner_id", "=", criteria.owner_id);
  }

  if (criteria.species) {
    query = query.where("species", "=", criteria.species);
  }

  if (includeOwner) {
    return await query
      .innerJoin("person", "person.id", "pet.owner_id")
      .execute();
  }

  return await query.selectAll().execute();
}

export async function updatePerson(id: number, updateWith: PersonUpdate) {
  await db.updateTable("person").set(updateWith).where("id", "=", id).execute();
}

export async function createPet(pet: NewPet) {
  await db
    .insertInto("pet")
    .values(pet)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deletePet(id: number) {
  await db
    .deleteFrom("pet")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
