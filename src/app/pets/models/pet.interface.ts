export interface Pet {
    id: Number,
    name: String,
    kind: String,
    weight: Number,
    height: Number,
    length: Number,
    photo_url: String,
    description: String,
    number_of_lives ?: Number;
}