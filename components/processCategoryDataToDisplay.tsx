import { Animal, Category } from "../constants/categoriesData";

export function processCategoryDataToDisplay(categories: Category[]) {
    // Filter expenses with "Confirmed" status
    let chartData = categories.map((item) => {
        let confirmExpenses = item.animals.filter((a: { healthStatus: string; }) => a.healthStatus == "H");
        var total = confirmExpenses.reduce((a: any, b: { count: any; }) => a + (b.count || 0), 0);

        return {
            name: item.name,
            y: total,
            expenseCount: confirmExpenses.length,
            color: item.color,
            id: item.id
        };
    });

    // filter out categories with no data/expenses
    let filterChartData = chartData.filter(a => a.y > 0);

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
        let percentage = (item.y / totalExpense * 100).toFixed(0);
        return {
            label: `${percentage}%`,
            y: Number(item.y),
            expenseCount: item.expenseCount,
            color: item.color,
            name: item.name,
            id: item.id
        };
    });

    return finalChartData;
}
