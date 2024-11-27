import React from 'react'
import Camera from '../components/shared/Camera.jsx'
import WeightChart from '../components/Charts/WeightChart.jsx'
import BasicModal from '../components/shared/BasicModal.jsx'
import CalorieChart from '../components/Charts/CalorieChart.jsx'
import Webcam from 'react-webcam'
import axios from 'axios'
function Home() {
  // Home page
  // Change tab title to 'Home'
  const [userStatus, setUserStatus] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/status`,
          { withCredentials: true } // Important for sending cookies
        );
        setUserStatus(response.data);
      }
      catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const [modalStat, setModalStat] = React.useState({
    open: false,
    title: '',
    description: ''
  });
  document.title = 'Home'
  return (
    <>
       <BasicModal modalStat={modalStat} setOpen={setModalStat} />
  <div className="h-screen w-full lg:w-4/5 bg-slate-50 overflow-auto">
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-start h-full px-4 sm:px-8 lg:px-10 gap-5">
        <p className="text-lg sm:text-2xl rounded-xl p-2 font-semibold text-[#ffd60a] bg-gray-700">
          Track your daily Calorie intake
        </p>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-700">
          Track your Daily <span className="text-[#ffd60a]">Calorie intake</span> with MyHealth
        </p>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center">
        {userStatus && <Camera userStatus={userStatus} triggerModal={setModalStat} />}
      </div>
    </div>
  </div>
    </>
  )
}

export default Home