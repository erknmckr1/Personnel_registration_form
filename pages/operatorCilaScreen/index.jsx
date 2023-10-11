/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import CustomButton from "@/components/cila_components/CustomButton";
import AuthPopUp from "@/components/cila_components/authPopUp";
import { useContext } from "react";
import { CılaContext } from "@/context/cilaContext";
import { GridRowModes, DataGrid } from "@mui/x-data-grid";
import StartWorkPopUp from "@/components/cila_components/StartWorkPopUp";
import axios from "axios";
import StopOrderPopUp from "@/components/cila_components/StopOrderPopUp";
import CancelOrderPopUp from "@/components/cila_components/CancelOrderPopUp";
import { toast } from "react-toastify";
import WorkEndPopUp from "@/components/cila_components/WorkEndPopUp";
function index() {
  const {
    persons,
    cilaWorkTable,
    orderInfo,
    orderTable,
    loggedInUser,
    setLoggedInUser,
    selectedOrder,
    setSelectedOrder,
    dateString,
    setCilaWorkTable,
  } = useContext(CılaContext);
  const [time, setTime] = useState(new Date());
  // Oturum acık mı kapalı mı jwt olusturmak yerıne kapalı bır server da oldugumuz ıcın oturumu state ile yonetıyoruz.
  const [isAuth, setİsAuth] = useState(false);
  // İşe baslamak ıcın gereklı modal'ı bu state'e gore acıp kapatıyoruz.
  const [isStartWork, setIsStartWork] = useState(false);
  // stop machine pop up ını acıp kapamak ıcın gereklı state
  const [isStopMachine, setIsStopMachine] = useState(false);
  // Sipariş iptal pop up'ının true false olma durumunu tutan state
  const [isCancelOrder, setIsCancelOrder] = useState(false);
  // işi bitirme sayfaasının acılıp kapanmasını tutacak state
  const [isEndWwork, setIsEndWork] = useState(false);
  // singOut user refresh to isAuth & LoggedInUser
  const handleClıckOut = () => {
    if (window.confirm("Çıkıs yapmak ıstedıgınıze emın mısınız ?")) {
      setLoggedInUser([]);
      setİsAuth(false);
      setIsStartWork(false);
      setSelectedOrder(null);
    }
  };

  // open to start work pop up
  const handleOpenStartWork = () => {
    setIsStartWork(true);
  };

  const handleIsEndWork = () =>{
    setIsEndWork(true)
  }

  const buttons = [
    { id: 0, title: "Çıkış Yap", onClick: handleClıckOut, showButton: true },
    {
      id: 1,
      title: "İşe Başla",
      onClick: handleOpenStartWork,
      showButton:
        selectedOrder === null ||
        (selectedOrder &&
          (selectedOrder.cancel_date !== "" ||
            selectedOrder.work_end_date !== "")),
    },
    {
      id: 2,
      title: "İşi Bitir",
      showButton:
        selectedOrder &&
        selectedOrder.cancel_date === "" &&
        selectedOrder.work_end_date === "",
        onClick:handleIsEndWork
    },

    { id: 3, title: "Yemek Molası", showButton: true },
    { id: 4, title: "Özel Ara", showButton: true },
    { id: 5, title: "Yemek Menüsü", showButton: true },
    { id: 6, title: "İzin Girişi", showButton: true },
    { id: 7, title: "Duyurular", showButton: true },
    { id: 8, title: "Ramat", showButton: true },
  ];

  // HOUR
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 30000);

    return () => clearInterval(intervalId); // bileşen kaldırıldığında interval'i temizle
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  //todo SIPARIS TABLOSUNDA DA YAPILACAK ISLEMLER
  // actıve yada durdurulmus order tablosundaki secılı order'ı tutacak state...

  const columns = [
    {
      field: "process_id",
      headerName: "İşlem Adı",
      width: 100,
      headerClassName: "custom-header",
    },
    {
      field: "work_start_date",
      headerName: "Başlangıç",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "stop_start_date",
      headerName: "Stop",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "work_end_date",
      headerName: "Bitiş",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "produced_amount",
      headerName: "İşlenen Miktar",
      width: 100,
      headerClassName: "custom-header",
    },
    {
      field: "work_type",
      headerName: "İş Tipi",
      width: 100,
      headerClassName: "custom-header",
    },
    {
      field: "order_no",
      headerName: "Order İd",
      width: 100,
      headerClassName: "custom-header",
    },
  ];

  // css to row
  const customRowClass = (params) => {
    if (params.row.stop_start_date !== "" && params.row.cancel_date === "") {
      return "custom-stop-row";
    } else if (
      params.row.stop_start_date === "" &&
      params.row.cancel_date === ""
    ) {
      return "custom-active-row";
    } else if (params.row.cancel_date !== "") {
      return "custom-cancel-row";
    } else if (params.row.order_status === "4") {
      return "custom-finish-row";
    }
  };

  // rows
  //cila_work_table'ı orderInfo.order_no ya gore fıltreleyıp gerekli verileri map ile döndük
  const workTableRow =
    cilaWorkTable.length > 0
      ? cilaWorkTable
          .filter((item) => item.order_status !== "4" && item.order_status !== "3")
          .map((item, index) => ({
            process_id: item.process_id,
            work_start_date: item.work_start_date,
            stop_start_date: item.stop_start_date,
            work_end_date: item.work_end_date,
            produced_amount: item.produced_amount,
            work_type: item.work_type,
            order_no: item.order_no,
            cancel_date: item.cancel_date,
            id: index,
          }))
      : null;

  const reversedWorkTableRow = workTableRow
    ? [...workTableRow].reverse()
    : null;

  const columnsTwo = [
    {
      field: "id",
      headerName: "Operator",
      width: 200,
      headerClassName: "custom-header",
    },
    {
      field: "name",
      headerName: "Molaya Çıkış T.",
      width: 200,
      headerClassName: "custom-header",
    },
  ];
  // Boş veri
  const rows = [];

  // todo Makineyi durdur işlemleri
  const handleOpenStopMachinePopUp = () => {
    if (selectedOrder && selectedOrder.stop_start_date === "") {
      setIsStopMachine(true);
    }
  };

  // todo Proses iptal işlemleri
  const handleOpenCancelOrderPopUp = () => {
    setIsCancelOrder(true);
  };

  //todo duran makineyi tekrardan baslatma işlemleri
  const handleStartToMacgineAgain = async () => {
    if (
      selectedOrder &&
      selectedOrder.order_status === "2" &&
      window.confirm("Prosesi yenıden baslatmak ıstediğinize emin misiniz ?")
    ) {
      try {
        const resData = {
          cancel_date: "",
          cancel_reason_id: "",
          cancel_user_id_dec: "",
          order_no: cilaWorkTable[cilaWorkTable.length - 1].order_no,
          process_id: cilaWorkTable[cilaWorkTable.length - 1].process_id,
          produced_amount: "",
          stop_end_date: dateString,
          stop_reason_id: "",
          stop_start_date: "",
          stop_user_id_dec: "",
          user_id_dec: cilaWorkTable[cilaWorkTable.length - 1].user_id_dec,
          work_end_date: "",
          work_start_date:
            cilaWorkTable[cilaWorkTable.length - 1].work_start_date,
          work_type: cilaWorkTable[cilaWorkTable.length - 1].work_type,
          order_status: "1",
          finisher_user_id: "",
        };
        const res = await axios.put("/api/cila/", resData);
        if (res.status === 200) {
          const updatedData = await axios.get("/api/cila");
          const newSelectedOrder = updatedData.data.cila_work_table[updatedData.data.cila_work_table.length -1];
          setSelectedOrder(newSelectedOrder)
          setCilaWorkTable(updatedData.data.cila_work_table);
          toast.success("Sipariş yeniden başlatıldı.");
        }
      } catch (err) {
        console.log(err);
        toast.error("Sipariş tekrardan baslatılamadı.");
      }
    }
  };
  console.log(selectedOrder)

  const buttonsRight = [
    {
      id: 1,
      title: "Siparişi Durdur",
      onClick: handleOpenStopMachinePopUp,
      showButton: selectedOrder && selectedOrder.order_status === "1",
    },
    {
      id: 2,
      title: "Yeniden Başlat",
      onClick: handleStartToMacgineAgain,
      showButton: selectedOrder && selectedOrder.order_status === "2",
    },
    {
      id: 3,
      title: "Prosesi İptal Et",
      onClick: handleOpenCancelOrderPopUp,
      showButton: selectedOrder && selectedOrder.order_status !== "3",
    },
  ];
  return (
    <div className="w-screen h-screen ">
      <div className="w-full h-full flex">
        {/* screen 1  */}
        <div className="w-1/2 h-full  flex relative">
          {/* left side  */}
          <div className="w-[35%] h-full ">
            {/* left image side */}
            <div className="w-full h-[30%] bg-white">
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
                <CustomButton
                  onClick={button.onClick}
                  key={button.id}
                  title={button.title}
                  showButton={button.showButton}
                />
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
            <div className="w-full h-[50%]  p-2">
              {/* right side sipariş no vs. */}
              <div className="w-full h-[30%] flex gap-x-6 border-1-black-500 border">
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">Sipariş No</span>
                  <span className="text-[18px]">
                  {selectedOrder && (selectedOrder.order_status !== "3" && selectedOrder.order_status !== "4") && orderInfo ? orderInfo.order_no : ""}
                  </span>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">Malzeme No</span>
                  <span className="text-[18px]">
                  {selectedOrder && (selectedOrder.order_status !== "3" && selectedOrder.order_status !== "4") && orderInfo ? orderInfo.metarial_no : ""}                  </span>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">Ayar/Renk</span>
                  <span className="text-[18px]">
                  {selectedOrder && (selectedOrder.order_status !== "3" && selectedOrder.order_status !== "4") && orderInfo ? orderInfo.carat : ""}

                  </span>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">Section</span>
                  <span className="text-[18px]">Cila</span>
                </div>
              </div>
              {/* right side genel ve kalem acıklaması */}
              <div className="w-full h-[50%] flex flex-col px-1 border border-1">
                <div className=" w-full max-h-full flex">
                  <div className="h-full w-[50%] flex gap-x-2">
                    <div className="w-full h-full flex border-r border-1 items-center flex-col  gap-y-1 px-3">
                      <span className="text-[25px] font-semibold">
                        Genel Açıklama
                      </span>
                      <span className="text-[18px]">
                      {selectedOrder && (selectedOrder.order_status !== "3" && selectedOrder.order_status !== "4") && orderInfo ? orderInfo.item_description : ""}
                      </span>
                    </div>
                  </div>
                  <div className="h-full w-[50%] flex gap-x-2">
                    <div className="w-full h-full flex  items-center flex-col  justify-between gap-y-1  px-3">
                      <span className="text-[25px] font-semibold">
                        Kalem Açıklaması
                      </span>
                      <span className="text-[16px]">
                      {selectedOrder && (selectedOrder.order_status !== "3" && selectedOrder.order_status !== "4") && orderInfo ? orderInfo.general_description : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* right side proses adı gecırılen sure vs.  */}
              <div className="w-full h-[20%] flex gap-x-6 border-1-black-500 border">
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">Proses Adı</span>
                  <span className="text-[18px]">
                    {selectedOrder && selectedOrder.process_id}
                  </span>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">
                    Yapıldığı Süre
                  </span>
                  <span className="text-[18px]">İş Türü</span>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
                  <span className="text-[25px] font-semibold">
                    Çalışma Durumu
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[18px]">
                      {selectedOrder && selectedOrder.work_type}
                    </span>
                    <span>
                      {orderInfo &&
                      cilaWorkTable.length > 0 &&
                      cilaWorkTable[cilaWorkTable.length - 1].work_end_date ===
                        ""
                        ? cilaWorkTable[cilaWorkTable.length - 1].work_type
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* grid area */}
            <div className="w-full h-[50%]">
              {/* grid 1  */}
              <div className="h-[240px]  w-full  flex">
                <DataGrid
                  rows={
                    reversedWorkTableRow && reversedWorkTableRow.length > 0
                      ? reversedWorkTableRow
                      : rows
                  }
                  columns={columns}
                  hideFooter
                  disableSelectionOnClick
                  onRowClick={(params) => {
                    const selectRow = orderTable.filter(
                      (item, index) => item.order_no === params.row.order_no
                    );
                    // setSelectedOrder({ selectRow, ...params.row });
                  }}
                  getRowClassName={customRowClass}
                  headerClassName="custom-header"
                />
              </div>
              {/* buttons */}
              <div className="h-[15%] w-full flex justify-evenly items-center">
                {selectedOrder &&
                (selectedOrder.work_end_date !== "" ||
                  selectedOrder.cancel_date !== "") ? (
                  <span className="font-semibold text-xl text-red-500">
                    Yeni işi başlatın...
                  </span>
                ) : (
                  buttonsRight.map((btn) => (
                    // eslint-disable-next-line react/jsx-key
                    //Prosesi ıptal et butonunu gereklı kosullarda goster. Notıon ad detaylı acıklaması var.
                    <CustomButton
                      onClick={btn.onClick}
                      showButton={btn.showButton}
                      key={btn.id}
                      title={btn.title}
                    />
                  ))
                )}
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
          {isAuth === false ? (
            <AuthPopUp
              setİsAuth={setİsAuth}
              setLoggedInUser={setLoggedInUser}
              persons={persons}
            />
          ) : null}
          {isStartWork === true ? (
            <StartWorkPopUp
              setIsStartWork={setIsStartWork}
              loggedInUser={loggedInUser}
            />
          ) : null}
          {isStopMachine === true ? (
            <StopOrderPopUp setIsStopMachine={setIsStopMachine} />
          ) : null}
          {isCancelOrder === true ? (
            <CancelOrderPopUp setIsCancelOrder={setIsCancelOrder} />
          ) : null}
          {isEndWwork === true ? (
            <WorkEndPopUp
              setIsEndWork={setIsEndWork}
              loggedInUser={loggedInUser}
            />
          ) : null}
        </div>

        {/* screen 2  */}
        <div className="w-1/2 h-full bg-blue-500 relative"></div>
      </div>
    </div>
  );
}

export default index;
