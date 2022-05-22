export interface RouterItem {
    path?:string;
    index?:boolean;
    guard?:()=>boolean;
    component?:React.ReactNode | null;
    children?:Array<RouterItem>;
    icon?:React.ReactNode | null;
    label?:string;
    key:string;
    hidden?:boolean,
    to?:string;
}