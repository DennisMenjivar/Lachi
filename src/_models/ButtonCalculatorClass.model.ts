export class ButtonCalculatorClass {
  id: number;
  name: string;
  enabled: boolean;

  constructor(pID: number, pName: string, pEnabled: any) {
    this.id = pID;
    this.name = pName;
    this.enabled = pEnabled;
  }
}