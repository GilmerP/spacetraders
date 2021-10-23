export default class SvgHelper {
  /**
   * draws a line between the given coordinates
   */
  static drawLine(x1: number, y1: number, x2: number, y2: number) {
    const newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    newLine.setAttribute("x1", String(x1));
    newLine.setAttribute("y1", String(y1));
    newLine.setAttribute("x2", String(x2));
    newLine.setAttribute("y2", String(y2));
    return newLine;
  }

  /**
   * returns the DOMRect Object from the HTMLElement with the given id
   * @param id The id of the DOM Object to retrieve the DOMRect from
   */
  static getBoxFromSvg(id: string): DOMRect {
    if (!id) throw new Error("Parameter must be a non-empty string");
    const element = document.getElementById(id) as Element;
    if (!element) throw new Error("given id is not present in dom");
    if (!(element instanceof SVGElement)) throw new Error("Element must be of type SVG");
    return (element as SVGSVGElement).getBBox();
  }

  /**
   * returns the center of the given box as coordinates
   */
  static getCenterOfBox(box: DOMRect) {
    return {
      x: box.x + box.width / 2,
      y: box.y + box.height / 2
    };
  }
}
