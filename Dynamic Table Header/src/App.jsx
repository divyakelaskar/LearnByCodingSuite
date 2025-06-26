import React, { useState, useMemo } from 'react';


function App() {

    const initialData = [
        { name: 'A', stock: 34, sales1: 35, sales2: 36, sales3: 36 },
        { name: 'B', stock: 34, sales1: 25, sales2: 26, sales3: 46 },
        { name: 'C', stock: 33, sales1: 55, sales2: 16, sales3: 26 },
    ];

    const [data, setData] = useState(initialData);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [filters, setFilters] = useState({
        name: '',
        stock: '',
        sales1: '',
        sales2: '',
        sales3: '',
    });

    const columnData = [
        { key: 'stock', retail: 120, wholesale: 230, label: 'Current Stock' },
        { key: 'sales1', retail: 150, wholesale: 300, label: 'Salesman 1' },
        { key: 'sales2', retail: 60, wholesale: 4500, label: 'Salesman 2' },
        { key: 'sales3', retail: 150, wholesale: 300, label: 'Salesman 3' },
    ];


    const handleSort = (key) => {
        setSortConfig((prev) => {
            const isAsc = prev.key === key && prev.direction === 'asc';
            return { key, direction: isAsc ? 'desc' : 'asc' };
        });
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const filteredData = useMemo(() => {
        return data
            .filter((item) =>
                Object.entries(filters).every(([key, val]) =>
                    String(item[key]).toLowerCase().includes(val.toLowerCase())
                )
            )
            .sort((a, b) => {
                const { key, direction } = sortConfig;
                const order = direction === 'asc' ? 1 : -1;
                if (typeof a[key] === 'number') {
                    return (a[key] - b[key]) * order;
                }
                return a[key].localeCompare(b[key]) * order;
            });
    }, [data, filters, sortConfig]);

    const SortButton = ({ columnKey }) => (
        <button onClick={() => handleSort(columnKey)} style={{ marginLeft: 4, cursor: 'pointer' }}>
            {sortConfig.key === columnKey ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '⇅'}
        </button>
    );

    return (
        <div style={{ padding: '1rem' }}>
            <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', marginTop: '2rem', width: '100%' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th rowSpan="3">
                            Product Name
                            <SortButton columnKey="name" />
                        </th>
                        <th>Retail</th>
                        <th>Wholesale</th>
                        <th>Retail</th>
                        <th>Wholesale</th>
                        <th>Retail</th>
                        <th>Wholesale</th>
                        <th>Retail</th>
                        <th>Wholesale</th>
                    </tr>
                    <tr>
                        {columnData.map((col) => (
                            <React.Fragment key={col.key}>
                                <th>{col.retail}</th>
                                <th>{col.wholesale}</th>
                            </React.Fragment>
                        ))}
                    </tr>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th colSpan={2}>
                            Current Stock
                            <SortButton columnKey="stock" />
                        </th>
                        <th colSpan={2}>
                            Salesman 1
                            <SortButton columnKey="sales1" />
                        </th>
                        <th colSpan={2}>
                            Salesman 2
                            <SortButton columnKey="sales2" />
                        </th>
                        <th colSpan={2}>
                            Salesman 3
                            <SortButton columnKey="sales3" />
                        </th>
                    </tr>
                    {/* Filter Row */}
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th>
                            <input
                                type="text"
                                placeholder="Filter name"
                                value={filters.name}
                                onChange={(e) => handleFilterChange('name', e.target.value)}
                                style={{ width: '90%' }}
                            />
                        </th>
                        <th colSpan={2}>
                            <input
                                type="text"
                                placeholder="Stock"
                                value={filters.stock}
                                onChange={(e) => handleFilterChange('stock', e.target.value)}
                                style={{ width: '90%' }}
                            />
                        </th>
                        <th colSpan={2}>
                            <input
                                type="text"
                                placeholder="Sales 1"
                                value={filters.sales1}
                                onChange={(e) => handleFilterChange('sales1', e.target.value)}
                                style={{ width: '90%' }}
                            />
                        </th>
                        <th colSpan={2}>
                            <input
                                type="text"
                                placeholder="Sales 2"
                                value={filters.sales2}
                                onChange={(e) => handleFilterChange('sales2', e.target.value)}
                                style={{ width: '90%' }}
                            />
                        </th>
                        <th colSpan={2}>
                            <input
                                type="text"
                                placeholder="Sales 3"
                                value={filters.sales3}
                                onChange={(e) => handleFilterChange('sales3', e.target.value)}
                                style={{ width: '90%' }}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {filteredData.map((product) => (
                        <tr key={product.name}>
                            <td>{product.name}</td>
                            <td colSpan={2}>{product.stock}</td>
                            <td colSpan={2}>{product.sales1}</td>
                            <td colSpan={2}>{product.sales2}</td>
                            <td colSpan={2}>{product.sales3}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
