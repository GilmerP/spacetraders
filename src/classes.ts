export class PopUp {
  public message = "";
  public title = "";
  public isVisible = false;

  public closePopUp(): void {
    this.isVisible = false;
  }

  constructor(inMessage?: string, inTitle?: string, inVisible?: boolean) {
    this.message = inMessage ? inMessage : "";
    this.title = inTitle ? inTitle : "";
    this.isVisible = inVisible ? inVisible : false;
  }
}
