import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontSize: FontSizeType;
    backgroundColor: BackgroundColorType;
    color: ColorType;
    borderColor: BorderColorType;
    statusColor: StatusColorType;
  }
}
