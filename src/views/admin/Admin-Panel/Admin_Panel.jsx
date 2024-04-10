import CircleChart from '../../../components/AdminPanel/analitycs chart/CircleChart';
import LinesChart from '../../../components/AdminPanel/analitycs chart/LinesChart'

const Admin_Panel = () => {
  return (
    
    <div className="min-h-screen grid grid-col-">
      <div className="xl:flex">
        <div className="bg-tertiary-100 xl:w-[45%] xl:h-[65%] rounded-xl mr-8 xl:mb-0 mb-8">
          <h1 className="text-xl font-semibold p-4">Company Facts</h1>
          <h5 className="text-gray-500 px-4">Employees</h5>
          <LinesChart />
        </div>
        <div className="bg-tertiary-100 xl:w-[45%] xl:h-[65%] rounded-xl">
          <CircleChart />
        </div>
      </div>
    </div>
  );
};

export default Admin_Panel;
