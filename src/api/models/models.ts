import { Model, Property, Reference, Validator } from "vulcain-corejs";

// -----------------------------------------------------------
// Cortex model
// -----------------------------------------------------------

// -----------------------------------------------------------
// Followup
// -----------------------------------------------------------

@Model()
export class Answer {
    @Property({ type: "string", required: true, unique: true, isKey: true })
    id: string;
    @Property({ type: "string", description: 'Set the unique identifiant of the action (such as a question) for which the answer is given.', required: true })
    actionId: string;
    @Property({ type: "any", required: true })
    value: any;
}

@Model()
export class ExamResults {
    @Property({ type: "string", required: true, unique: true, isKey: true })
    id: string;
    @Property({ type: "date-iso8601", required: true })
    startDate: string;
    @Property({ type: "date-iso8601", required: true, })
    endDate: string;
    @Property({ type: "number", required: true })
    score: number;
    @Property({ type: "boolean", required: true })
    completed: boolean;
    @Property({ type: "string", required: true })
    testId: string;
    @Reference({ cardinality: 'many', item: 'Answer' })
    answers: Answer[];
}

@Model()
export class Motivation {
    @Property({ type: "string", required: true, unique: true, isKey: true })
    id: string;
    @Property({ type: "string", required: true })
    description: string;
}

@Model({ extends: 'Motivation' })
export class ConcussionProtocol extends Motivation {
    @Property({ type: "string", required: true })
    gameId: string;
    @Property({ type: "string", required: true })
    playerId: string;
    @Property({ type: "arrayOf", items: 'string', required: true })
    voters: string[];
}

@Model()
export class FollowUp {
    @Property({ type: "string", required: true, unique: true, isKey: true })
    id: string;
    @Property({ type: "date-iso8601", required: true })
    startDate: string;
    @Reference({ cardinality: 'many', item: 'Exam' })
    examResults: ExamResults[];
    @Property({ type: "string", required: true })
    carePlanId: string;
    @Property({ type: "string", required: true })
    userId: string;
    @Reference({ cardinality: 'one', item: 'Motivation', required: false })
    motivation: Motivation;
}