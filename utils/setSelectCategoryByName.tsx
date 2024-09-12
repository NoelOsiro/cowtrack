export function setSelectCategoryByName(name: any, categories: any[], setSelectedCategory: { (arg0: any): void; }) {
    let category = categories.filter(a => a.name == name);
    setSelectedCategory(category[0]);
}
