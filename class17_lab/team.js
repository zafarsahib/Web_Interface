// This file defines the Team class, which represents a team in the tournament. 
// It includes properties such as name, group, points, and methods 
// for validation and summary generation.

export class Team {

    constructor(
        id,
        name,
        group,
        points,
        played,
        goalDifference
    )
    {
        if (
            !name ||
            points < 0
        ) {
            throw new Error(
                "Invalid team data."
            );
        }

        this.id = id;
        this.name = name;
        this.group = group;
        this.played = played;
        this.goalDifference =
            goalDifference;

        this.points = points;
    }

    get summary() {

        return `${this.name} - Group ${this.group} - ${this.points} pts`;

    }

    set points(value) {

        if (value < 0) {

            throw new Error(
                "Points cannot be negative."
            );

        }

        this.__points = value;
    }

    get points() {

        return this.__points;

    }

    static fromObject(data) {

        return new Team(
            data.id,
            data.name,
            data.group,
            data.points,
            data.played,
            data.goalDifference
        );

    }

}