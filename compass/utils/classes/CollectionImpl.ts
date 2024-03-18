class CollectionImpl {
    title: string;
    icon: any;
    data: any;

    constructor(title: string, icon: any) {
        this.title = title;
        this.icon = icon;
    }

    // subject to change
    setData(data: any){
        this.data = data;
    }

}