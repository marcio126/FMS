// vehicle.jsx

import ProviderTable from "@/components/Table/ProviderTable";
import DriverProviderTable from "@/components/Table/DriverProviderTable"
const ProviderPage = () => {
  return (
    <>
      <ProviderTable /> {/* Ensure correct usage */}
      <DriverProviderTable/>
    </>
  );
};

export default ProviderPage;
