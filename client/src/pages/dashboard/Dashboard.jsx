import "./products.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Widgets from "../../components/widget/Widget";
import "./dashboard.scss";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });

  const { sales } = useContext(AuthContext);

  return (
    <>
      <div className="widgets">
        <Widgets type="order" />
      </div>
      <div className="listContainer">
        <div className="listTitle">Recent Reports</div>
        {/* <Table/> */}

        <DataTable
          value={sales}
          filters={filters}
          paginator
          rows={4}
          rowsPerPageOptions={[1, 2, 3, 4]}
          // totalRecords={sales?.length}
        >
          {/* <Column field="_id" header="ID" sortable /> */}
          <Column field="full_name" header="Full Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="phone" header="Phone" />
          <Column field="phone_2" header="Phone 2" />
          <Column field="district" header="District" />
          <Column field="total" header="Total" sortable />
          <Column field="address" header="Address" sortable />
        </DataTable>

        <Link to="/sales">
          <button className="button">View More...</button>
        </Link>
      </div>{" "}

      <Footer />

    </>
  );
};

export default Dashboard;
