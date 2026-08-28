import MobileNavbar from '../components/MobileNavbar';
import Sidebar from '../components/Sidebar';
import Header from '../components/ui/Header'
import WeekSchedule from '../components/WeekSchedule';
import WeekToggle from '../components/ui/WeekToggle';
import SubjectInfo from '../components/ui/SubjectInfo';
import SubjectInfoPopUp from '../components/modals/SubjectInfoPopUp';

import useLocalStorage from 'use-local-storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ScheduleProvider from '../providers/ScheduleProvider';

const Schedule = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

  const [isDark, setDark] = useLocalStorage('isDark');
  const [isOpen, setSideBar] = useLocalStorage('isSideBarOpen');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1300)
        setSideBar(false);

      setIsMobile(window.innerWidth < 750);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);
  
  return (
    <ScheduleProvider>
      {!isMobile ?
        <>
          <Sidebar 
            isDark={isDark}
            handleTheme={() => setDark(!isDark)}
            isOpen={isOpen}
            handleSize={() => {!setSideBar(!isOpen)}}
          />
          <main className={`${isOpen ? '' : 'wider'}`}>
            <Header/>
            <div className={`container ${isOpen ? '' : 'wider'}`}>
              <section>
                <WeekSchedule/>
              </section>

              <section>
                <WeekToggle/>
                <SubjectInfo/>
              </section>
            </div>
          </main>
        </>
        :
        <>
          <main className='wider'>
            <MobileNavbar/>
            <Header/>
            <div className={`container ${isOpen ? '' : 'wider'}`}>
              <section>
                <WeekSchedule/>
              </section>
            </div>
            <SubjectInfoPopUp/>
          </main>
        </>
      }
    </ScheduleProvider>
  ); 
};

export default Schedule;
