import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
    const rowData = useMemo(() => [
        { name: 'A', stock: 34, sales1: 35, sales2: 36, sales3: 37 },
        { name: 'B', stock: 34, sales1: 25, sales2: 26, sales3: 46 },
        { name: 'C', stock: 33, sales1: 55, sales2: 16, sales3: 26 },
    ], []);

    const columnData = [
        { key: 'stock', retail: 120, wholesale: 230, label: 'Current Stock', filter: 'agTextColumnFilter' },
        { key: 'sales1', retail: 150, wholesale: 300, label: 'Salesman 1', filter: true },
        { key: 'sales2', retail: 60, wholesale: 4500, label: 'Salesman 2', filter: true },
        { key: 'sales3', retail: 150, wholesale: 300, label: 'Salesman 3', filter: true },
    ];

    const columnDefs = useMemo(() => {
        const groupCols = columnData.map((col) => ({
            headerName: col.label,
            children: [
                {
                    headerName: `Retail (${col.retail})`,
                    field: col.key,
                    filter: false,
                    sortable: true,
                    valueGetter: (params) => params.data[col.key],
                },
                {
                    headerName: `Wholesale (${col.wholesale})`,
                    field: col.key,
                    filter: false,
                    sortable: false,
                    valueGetter: (params) => params.data[col.key],
                },
            ],
        }));

        return [
            {
                headerName: 'Product Name',
                field: 'name',
                filter: 'agTextColumnFilter',
                sortable: true,
                pinned: 'left',
            },
            ...groupCols,
        ];
    }, [columnData]);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 1500 }}>
            <AgGridReact
            theme='legacy'
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                    flex: 1,
                    resizable: true,
                    filter: true,
                    sortable: true,
                }}
                domLayout="autoHeight"
            />
        </div>
    );
}

export default App;
