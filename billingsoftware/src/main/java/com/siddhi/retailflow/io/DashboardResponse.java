package com.siddhi.retailflow.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor                          // ✅ Fixed: NoArgsContructor -> NoArgsConstructor
public class DashboardResponse {            // ✅ Fixed: classDashboardResponse -> class DashboardResponse

    private Double todaySales;
    private Long todayOrderCount;           // ✅ Fixed: tdayordercount -> todayOrderCount
    private Long totalOrders;              // ✅ Fixed: priacvate lust -> proper field
    private Double totalSales;
    private Long totalItems;
    private Long totalCategories;
    private Long totalUsers;
}