export default class Common {
  public static getIconForGood(goodName: string) {
    switch (goodName.toUpperCase()) {
      case "research".toUpperCase():
        return "search";
      case "workers".toUpperCase():
        return "wrench";
      case "chemicals".toUpperCase():
        return "bong";
      case "ship_plating".toUpperCase():
        return "shield-alt";
      case "metals".toUpperCase():
        return "industry";
      case "fuel".toUpperCase():
        return "burn";
      case "machinery".toUpperCase():
        return "cogs";
      case "ship_parts".toUpperCase():
        return "box-open";
      case "consumer_goods".toUpperCase():
        return "tags";
      case "textiles".toUpperCase():
        return "tshirt";
      case "electronics".toUpperCase():
        return "bolt";
      case "food".toUpperCase():
        return "hamburger";
      default:
        return "";
    }
  }
}
