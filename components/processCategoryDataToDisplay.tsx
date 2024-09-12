import { Animal, Category } from "../constants/categoriesData";

export function processCategoryDataToDisplay(categories: Category[]) {
    // Calculate total animals per category
    const totalAnimalsPerCategory = getTotalAnimalsPerCategory(categories);

    // Filter expenses with "Confirmed" status
    let chartData = categories.map((item) => {
        let confirmExpenses = item.animals.filter((a: { healthStatus: string; }) => a.healthStatus == "H");
        let total = confirmExpenses.reduce((a: any, b: { count: any; }) => a + (b.count || 0), 0);

        return {
            name: item.name,
            y: total,
            expenseCount: confirmExpenses.length,
            color: item.color,
            id: item.id,
            count: totalAnimalsPerCategory[item.name] // Use the total number of animals
        };
    });

    // Filter out categories with no data/expenses
    let filterChartData = chartData.filter(a => a.y > 0);

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
        let percentage = (item.count / totalExpense * 100).toFixed(0);
        return {
            label: `${percentage}%`,
            y: Number(item.y),
            expenseCount: item.expenseCount,
            color: item.color,
            name: item.name,
            id: item.id,
            count: item.count
        };
    });

    return finalChartData;
}

function getTotalAnimalsPerCategory(categories: Category[]): { [key: string]: number } {
    const totals: { [key: string]: number } = {};

    categories.forEach(category => {
        // Calculate total count of animals in the current category
        const totalCount = category.animals.reduce((sum, animal) => sum + animal.count, 0);
        totals[category.name] = totalCount;
    });

    return totals;
}
