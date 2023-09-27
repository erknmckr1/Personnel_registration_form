/* eslint-disable react/jsx-key */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Checkbox from '@mui/material/Checkbox';
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

function FormTable(props) {
  const { persons, setPersons, setShowForm,selectedUser,setSelectedUser,setCheckedUser,checkedUser,fılteredPersons } = props;
  const [rowModesModel, setRowModesModel] = useState({});

  const handleCheckboxChange = (props) => {
    const { params, e } = props;
   
    if(e.target.checked){
      setCheckedUser(true);
      setSelectedUser(params.row)
    }else{
      setSelectedUser(null)
      setCheckedUser(false);
    }
  };
  
  // Add user
  function EditToolbar() {
    const handleClick = () => {
      setShowForm(true);
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  // edit stop 
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
    
 
  // Düzenleme moduna gecırecek event...
  const handleEditClick = (id) => {
    const confirmed = window.confirm("Are you sure you want to edit the user?");
    if (confirmed) {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    }
  };

  // update query
  const handleSaveClick = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to update the user? "
    );
    if (confirmation) {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      if (selectedUser && selectedUser.id === id) {
        try {
          const response = await axios.put(`/api/person/${id}`, selectedUser);
          if (response.status === 200) {
            toast.success("User updated with success");
          } else {
            toast.error("Unfortunately the user could not be updated");
          }
        } catch (err) {
          console.log(err);
        }
      }else{
        toast.error('Güncelleyeceğin kullanıcıyı seç. ')
      }
    }
  };

  // delete queryyi
  const handleDeleteClick = async (id) => {
    console.log(id)
    if (id && selectedUser && checkedUser) {
      const confirmation = window.confirm(`Delete user with ${id} ? `);
      if (confirmation) {
        try {
          const res = await axios.delete(`/api/person/${id}`);
          if (res.status === 200) {
            toast.success("Person successfully deleted");
          }
        } catch (err) {
          console.log(err);
          toast.error("An error occurred while deleting the person");
        }
      }
    }
  };

  // düzenleme modundakı işlemin ıptalı satırı eskı halıne getır... 
  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = persons.find((person) => person.id === id);
    if (editedRow.isNew) {
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  // duzenle kaydet
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setPersons(
      persons.map((person) => (person.id === newRow.id ? updatedRow : person))
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  
  // field ile veri nesnesının
  const columns = [
    {
      field: "checkbox",
      headerName: "Select",
      width: 50,
      renderCell: (params) => (
        <Checkbox
          checked={rowModesModel[params.id]?.mode !== GridRowModes.Edit && params.row.selected}
          onClick={(e) => {
            if (rowModesModel[params.id]?.mode !== GridRowModes.Edit) {
              handleCheckboxChange({ e,params });
            }
          }}
        />
      ),
      
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={() => handleSaveClick(id)}
          />,
        ];
      },
    },
    { field: "id_dec", headerName: "Dec Id", width: 100 },
    { field: "id_hex", headerName: "Hex Id", width: 100 },
    { field: "op_name", headerName: "Name", width: 100,editable: true },
    { field: "op_username", headerName: "Username", width: 100,editable: true },
    { field: "op_password", headerName: "Password", width: 100,editable: true },
    { field: "op_section", headerName: "Section", width: 100,editable: true },
    { field: "part", headerName: "Part", width: 100,editable: true },
    { field: "title", headerName: "Title", width: 150,editable: true },
    { field: "e_mail", headerName: "E-mail", width: 100,editable: true },
    { field: "gender", headerName: "Gender", width: 100,editable: true },
    { field: "short_name", headerName: "Short Name", width: 100,editable: true },
    { field: "address", headerName: "Address", width: 150,editable: true },
    { field: "route", headerName: "Route", width: 100,editable: true },
    { field: "stop_name", headerName: "Stop Name", width: 100,editable: true },
    { field: "is_active", headerName: "Is Active", width: 100,editable: true },
    { field: "is_admin", headerName: "Is Admin", width: 100,editable: true },
    { field: "shift_validator", headerName: "Shift Validator", width: 100,editable: true,editable: true },
    { field: "auth2", headerName: "Auth2", width: 100,editable: true },
    { field: "auth1", headerName: "Auth1", width: 100,editable: true },
    { field: "izin_bakiye", headerName: "Izin Bakiye", width: 100,editable: true },
  ];

  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={fılteredPersons}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
      />
    </Box>
  );
}

export default FormTable;
