import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../services/api/axios';


export default function PrivateRoutes() {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            try { 
                await api.get('schedule/') ;
                document.title = 'Особистий кабінет - ВСП "Фаховий коледж ЧНУ"';
            }
            catch (error) {
                if (error.response?.data.response === 'Refresh token відсутній') {
                    await console.log(error.response?.data.response);

                    localStorage.removeItem('user');
                    localStorage.removeItem('subjects');
              
                    navigate('/login');
                    document.title = 'Увійдіть в обліковий запис - ВСП "Фаховий коледж ЧНУ"';
                }
            }
        }
        checkAuth();

    }, [navigate]);

    return <Outlet />;
};