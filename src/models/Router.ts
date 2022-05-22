export interface RouterItem {
    path?:string;
    index?:boolean;
    guard?:()=>boolean;
    component?:React.ReactNode | null;
    children?:Array<RouterItem>;
}