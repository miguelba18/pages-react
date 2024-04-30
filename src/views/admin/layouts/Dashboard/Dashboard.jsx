import CircleChart from '../../../../../src/components/AdminPanel/analitycs chart/CircleChart';
import LinesChart from '../../../../../src/components/AdminPanel/analitycs chart/LinesChart';
import Card from '../../../../views/admin/layouts/Dashboard/Cards/Card';
const Dashboard = () => {
  return (
    
    <div className="min-h-screen grid">
      <div className="xl:flex mb-10">
        <div className="bg-tertiary-100 xl:w-[45%] xl:h-[100  %] rounded-xl mr-8 xl:mb-0 mb-8">
          <h1 className="text-xl font-semibold p-4">Company Facts</h1>
          <h5 className="text-gray-500 px-4">Employees</h5>
          <LinesChart />
        </div>
        <div className="bg-tertiary-100 xl:w-[45%] xl:h-[90%] rounded-xl">
          <CircleChart />
        </div>
      </div>
      <Card/>

    </div>
  );
};

export default Dashboard;
