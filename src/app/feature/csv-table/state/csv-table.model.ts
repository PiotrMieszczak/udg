export class Article {
  hauptartikelnr: string | null = null;
  artikelname: string | null = null;
  hersteller: string | null = null;
  beschreibung: string | null = null;
  materialangaben: string | null = null;
  geschlecht: string | null = null;
  produktart: string | null = null;
  ärmel: string | null = null;
  bein: string | null = null;
  kragen: string | null = null;
  herstellung: string | null = null;
  taschenart: string | null = null;
  grammatur: string | null = null;
  material: string | null = null;
  ursprungsland: string | null = null;
  bildname: string | null = null;

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
  hauptartikelnr: string | null;
  artikelname: string | null;
  hersteller: string | null;
  beschreibung: string | null;
  materialangaben: string | null;
  geschlecht: string | null;
  produktart: string | null;
  ärmel: string | null;
  bein: string | null;
  kragen: string | null;
  herstellung: string | null;
  taschenart: string | null;
  grammatur: string | null;
  material: string | null;
  ursprungsland: string | null;
  bildname: string | null;
}
