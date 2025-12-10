export class BaseSeeder {
    async run() {
        throw new Error("run() must be implemented in child classes");
    }
}
