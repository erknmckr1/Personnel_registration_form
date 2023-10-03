/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import CustomButton from "@/components/cila_components/CustomButton";
import AuthPopUp from "@/components/cila_components/authPopUp";
import { useContext } from "react";
import { CılaContext } from "@/context/cilaContext";
import {
  GridRowModes,
  DataGrid,
 
} from "@mui/x-data-grid";
import StartWorkPopUp from "@/components/cila_components/StartWorkPopUp";


function index() {
  const {persons} = useContext(CılaContext);
  const [time, setTime] = useState(new Date());
  // Oturum acık mı kapalı mı jwt olusturmak yerıne kapalı bır server da oldugumuz ıcın oturumu state ile yonetıyoruz.
  const [isAuth,setİsAuth] = useState(false)
  // Oturum acan kullanıcının bılgılerını burada tutuyoruz.
  const [loggedInUser,setLoggedInUser] = useState([])
  // İşe baslamak ıcın gereklı modal'ı bu state'e gore acıp kapatıyoruz.
  const [isStartWork,setIsStartWork] = useState(false)


  // singOut user refresh to isAuth & LoggedInUser
  const handleClıckOut = () => {
    if(window.confirm("Çıkıs yapmak ıstedıgınıze emın mısınız ?")){
      setLoggedInUser([]);
      setİsAuth(false)
      setIsStartWork(false)
    }
  }

  // open to start work pop up 
  const handleOpenStartWork = () => {
    setIsStartWork(true)
  }
  
  const buttons = [
    { id: 0, title: "Çıkış Yap", onClick:handleClıckOut },
    { id: 1, title: "İşe Başla" , onClick:handleOpenStartWork },
    { id: 2, title: "Yemek Molası" },
    { id: 3, title: "Özel Ara" },
    { id: 4, title: "Yemek Menüsü" },
    { id: 5, title: "İzin Girişi" },
    { id: 6, title: "Duyurular" },
    { id: 7, title: "Ramat" },
  ];

  const buttonsRight = [
    { id: 1, title: "Siparişi Durdur" },
    { id: 2, title: "Yeniden Başlat" },
    { id: 3, title: "Prosesi İptal Et" },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 30000);

    return () => clearInterval(intervalId); // bileşen kaldırıldığında interval'i temizle
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  const columns = [
    { field: "id", headerName: "İşlem Adı", width: 100 },
    { field: "name", headerName: "Başlangıç", width: 100 },
    { field: "age", headerName: "Bitiş", width: 100 },
    { field: "x", headerName: "İşlenen Miktar", width: 100 },
    { field: "y", headerName: "İş Tipi", width: 100 },
    { field: "z", headerName: "Order İd", width: 100 },
  ];

  const columnsTwo = [
    { field: "id", headerName: "Operator", width: 100},
    { field: "name", headerName: "Molaya Çıkış T.", width: 100 },
  ];

  // Boş veri
  const rows = [];

  return (
    <div className="w-screen h-screen ">
      <div className="w-full h-full flex">
        {/* screen 1  */}
        <div className="w-1/2 h-full  flex relative">

          {/* left side  */}
          <div className="w-[35%] h-full ">
            {/* left image side */}
            <div  className="w-full h-[30%] bg-white">
              <div className="w-full h-[85%] p-3">
                <div className="w-full h-full p-3 border-3-black border">
                  <Image
                    alt=""
                    width={1000}
                    height={800}
                    src="/1-removebg.png"
                  />
                </div>
              </div>
              <div className="w-full h-[15%] flex justify-center items-center text-xl font-semibold">
                <span>{loggedInUser && loggedInUser.op_name}</span>
              </div>
            </div>
            {/* left side buttons */}
            <div className="w-full h-[55%] flex flex-col justify-center items-center gap-y-5 ">
              {buttons.map((button) => (
                <CustomButton onClick={button.onClick} key={button.id} title={button.title} />
              ))}
            </div>
            {/* left time side */}
            <div className="w-full h-[15%] bg-white flex items-center justify-center text-[40px] font-bold">
              <span>{`${hours}:${minutes}`}</span>
            </div>
          </div>
          {/* right side  */}
          <div className="w-full h-full">
            {/* iş tanımları */}
            <div className="w-full h-[50%] bg-green-300 p-2">
              {/* right side sipariş no vs. */}
              <div className="w-full h-[30%] flex gap-x-6 border-1-black-500 border">
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">Sipariş No</span>
                  <span className="text-[18px]">xxxxxxx</span>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">Malzeme No</span>
                  <span className="text-[18px]">xxxxxxx</span>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">Ayar/Renk</span>
                  <span className="text-[18px]">xxxxxxx</span>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">Section</span>
                  <span className="text-[18px]">xxxxxxx</span>
                </div>
              </div>
              {/* right side genel ve kalem acıklaması */}
              <div className="w-full h-[50%] flex flex-col px-1 border border-1">
                <div className=" w-full max-h-full flex">
                  <div className="h-full w-[50%] flex gap-x-2">
                    <div className="w-full h-full flex flex-col  gap-y-1 px-3">
                      <span className="text-[25px] font-semibold">
                        Genel Açıklama
                      </span>
                      <span className="text-[18px]">xxxxxxx</span>
                    </div>
                  </div>
                  <div className="h-full w-[50%] flex gap-x-2">
                    <div className="w-full h-full flex flex-col  justify-between gap-y-1  px-3">
                      <span className="text-[25px] font-semibold">
                        Kalem Açıklaması
                      </span>
                      <span className="text-[16px]">
                        EKSIK YADA FAZLA ISTENMIYOR. KALITE COK ONEMLIDIR.
                        asdkaösdbgahjsdgjahsgdkhgdahgfd
                        asdvgasgdhvashdvgahjsdhasdvhEKSIK YADA FAZLA ISTENMIYOR.
                        KALITE COK ONEMLIDIR.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* right side proses adı gecırılen sure vs.  */}
              <div className="w-full h-[20%] flex gap-x-6 border-1-black-500 border">
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">Proses Adı</span>
                  <span className="text-[18px]">xxxxxxx</span>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">
                    Yapıldığı Süre
                  </span>
                  <span className="text-[18px]">İş Türü</span>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">Ayar/Renk</span>
                  <span className="text-[18px]">xxxxxxx</span>
                </div>
              </div>
            </div>
            {/* grid area */}
            <div className="w-full h-[50%] bg-yellow-300">
              {/* grid 1  */}
              <div className="h-[50%] w-full flex">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  // pageSize={10}
                  disableSelectionOnClick // Satır seçimini devre dışı bırak
                  hideFooter={true} // pagination  kısmını kaldırır.
                  autoPageSize
                />
              </div>
              {/* buttons */}
              <div className="h-[15%] w-full flex justify-evenly items-center">
                {buttonsRight.map((btn) => (
                  // eslint-disable-next-line react/jsx-key
                  <CustomButton key={btn.id} title={btn.title} />
                ))}
              </div>
              {/* grid-2 grid-3 */}
              <div className="h-[30%] w-full flex gap-x-2 ">
                <div className="h-full w-[50%]">
                  <span>Yemek Molasındakiler</span>
                  <div className="h-full w-full flex">
                    <DataGrid
                      rows={rows}
                      columns={columnsTwo}
                      // pageSize={10} // Sayfa boyutu
                      disableSelectionOnClick // Satır seçimini devre dışı bırak
                      hideFooter={true} // pagination  kısmını kaldırır.
                      
                    />
                  </div>
                </div>
                <div className="h-full w-[50%]">
                  <span>Yemek Molasındakiler</span>
                  <div className="h-full w-full">
                    <DataGrid
                      rows={rows}
                      columns={columnsTwo}
                      // pageSize={10} // Sayfa boyutu
                      disableSelectionOnClick // Satır seçimini devre dışı bırak
                      hideFooter={true} // pagination  kısmını kaldırır.
                      autoPageSize
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isAuth === false ? <AuthPopUp setİsAuth={setİsAuth} setLoggedInUser={setLoggedInUser} persons={persons}/> : null}
        </div>
        
        {/* screen 2  */}
        <div className="w-1/2 h-full bg-blue-500 relative">
                  {isStartWork === true ? <StartWorkPopUp setIsStartWork={setIsStartWork} loggedInUser={loggedInUser}/> : null}
        </div>
      </div>
      
    </div>
  );
}

export default index;
