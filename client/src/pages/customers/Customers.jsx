import "./customers.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../context/authContext";

const Products = () => {
  const [filters, setFilters] = useState({
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });

  const { sales } = useContext(AuthContext);

  return (
    <>
      <h2>All Customers</h2>

      <InputText
        className="w-full mt-70"
        placeholder="Let's find something..."
        style={{
          width: "600px",
          margin: "10px",
          marginLeft: "350px",
          outlineColor: "red",
        }}
        onInput={(e) =>
          setFilters({
            global: {
              value: e.target.value,
              matchMode: FilterMatchMode.CONTAINS,
            },
          })
        }
      />
      <span className="search font-bold">Search</span>

      <DataTable
        value={sales}
        filters={filters}
        paginator
        rows={7}
        rowsPerPageOptions={[1, 2, 3, 4]}
        totalRecords={15}
      >
        <Column field="full_name" header="Full customer Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="district" header="District" sortable />
        <Column field="createdAt" header="Date" sortable />
      </DataTable>
    </>
  );
};

export default Products;
