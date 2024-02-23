export default async function hash(input: string): Promise<string> {
  return await Bun.password.hash(input, {
    algorithm: "bcrypt",
    cost: 12
  });
}