import { useContext, createContext, useState, useEffect } from 'react';
import api from '../services/api/axios';
import { toast } from 'sonner';

const ScheduleContext = createContext();

export default function ScheduleProvider({ children }) {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
              const response = await api.get('schedule/');
              setSubjects(response.data);
            }
            catch (error) {
                toast.error('Помилка при завантаженні предметів. Спробуйте оновити сторінку.');
                console.error('Failed to fetch Subjects:', error.response?.data) 
            }
        };
        fetchSubjects()
    }, []);


    const [focusedSubject, setFocusedSubject] = useState({});

    const weekDay = new Date().getDay();
    const [currDay, setCurrDay] = useState( weekDay < 7 ? weekDay : 1);
    const [currWeek, setCurrWeek] = useState(1);
 
    return (
        <ScheduleContext.Provider
            value={{ subjects, focusedSubject, setFocusedSubject, currDay, setCurrDay, currWeek, setCurrWeek }}
        >
            {children}
        </ScheduleContext.Provider>
    );
}

export const useSchedule = () => useContext(ScheduleContext);
