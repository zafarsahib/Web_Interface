export default class Artist {
  constructor(id,name,country,genre){
    this.id=id;
    this.name=name;
    this.country=country;
    this.genre=genre;
  }

  get displayLabel(){
    return `${this.name} — ${this.country}`;
  }
}