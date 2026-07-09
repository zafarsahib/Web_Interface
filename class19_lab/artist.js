// This file defines the Artist class, which represents an artist
// in the festival lineup. It includes validation,
// a getter, a setter, and a static method.

export class Artist {

    constructor(
        id,
        name,
        genre,
        stage,
        time,
        country,
        headliner
    )
    {
        if (
            !name ||
            !genre
        ) {
            throw new Error(
                "Invalid artist data."
            );
        }

        this.id = id;

        this.name = name;

        this.genre = genre;

        this.stage = stage;

        this.time = time;

        this.country = country;

        this.headliner = headliner;

    }

    get summary() {

        return `${this.name} - ${this.genre} - ${this.stage}`;

    }

    set headliner(value) {

        if (
            typeof value !== "boolean"
        ) {

            throw new Error(
                "Headliner must be true or false."
            );

        }

        this.__headliner = value;

    }

    get headliner() {

        return this.__headliner;

    }

    static fromObject(data) {

        return new Artist(

            data.id,

            data.name,

            data.genre,

            data.stage,

            data.time,

            data.country,

            data.headliner

        );

    }

}