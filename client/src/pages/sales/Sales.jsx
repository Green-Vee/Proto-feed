import React from "react";
import "./sales.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const Sales = () => {
  const [filters, setFilters] = useState({
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });

  const { sales, delete_sale } = useContext(AuthContext);

  const call_delete = (sale) => {
    delete_sale(sale);
  };

  const view = (sales) => {
    return (
      <React.Fragment>
        <Link to={`/sale/${sales._id}`} state={sales}>
          <button
            icon="pi pi-pencil"
            className="p-button"
            onClick={() => console.log(sales._id)}
          >
            View
          </button>
        </Link>
      </React.Fragment>
    );
  };
  const deleteSale = (sales) => {
    return (
      <React.Fragment>
        <button
          icon="pi pi-pencil"
          className="p-button"
          onClick={() => call_delete(sales._id)}
        >
          Delete
        </button>
      </React.Fragment>
    );
  };

  return (
    <>
      <h2>All Sales</h2>

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

      <DataTable
        value={sales}
        filters={filters}
        paginator
        rows={4}
        rowsPerPageOptions={[1, 2, 3]}
        totalRecords={sales?.length}
        className="custom-datatable"
      >
        {/* <Column field="_id" header="ID" sortable /> */}
        <Column field="full_name" header="Full Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="phone" header="Phone" />
        {/* <Column field="district" header="District" /> */}
        <Column field="total" header="Total" sortable />
        <Column field="address" header="Address" sortable />
        <Column body={view} />
        <Column body={deleteSale} />
      </DataTable>
    </>
  );
};

export default Sales;
