export class Article {
  hauptartikelnr: string = '';
  artikelname: string = '';
  hersteller: string = '';
  beschreibung: string = '';
  materialangaben: string = '';
  geschlecht: string = '';
  produktart: string = '';
  ärmel: string = '';
  bein: string = '';
  kragen: string = '';
  herstellung: string = '';
  taschenart: string = '';
  grammatur: string = '';
  material: string = '';
  ursprungsland: string = '';
  bildname: string = '';

  constructor(prop?: IArticle) {
    if (!prop) {
      return;
    }
    this.hauptartikelnr = prop.hauptartikelnr;
    this.artikelname = prop.artikelname;
    this.hersteller = prop.hersteller;
    this.beschreibung = prop.beschreibung;
    this.materialangaben = prop.materialangaben;
    this.geschlecht = prop.geschlecht;
    this.produktart = prop.produktart;
    this.ärmel = prop.ärmel;
    this.bein = prop.bein;
    this.kragen = prop.kragen;
    this.herstellung = prop.herstellung;
    this.taschenart = prop.taschenart;
    this.grammatur = prop.grammatur;
    this.material = prop.material;
    this.ursprungsland = prop.ursprungsland;
    this.bildname = prop.bildname;
  }
}

export interface IArticle {
  hauptartikelnr: string;
  artikelname: string;
  hersteller: string;
  beschreibung: string;
  materialangaben: string;
  geschlecht: string;
  produktart: string;
  ärmel: string;
  bein: string;
  kragen: string;
  herstellung: string;
  taschenart: string;
  grammatur: string;
  material: string;
  ursprungsland: string;
  bildname: string;
}
