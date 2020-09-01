import React, { CSSProperties } from "react";
import MUIDataTable, { MUIDataTableColumn, MUIDataTableProps, MUIDataTableOptions } from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Overrides as CoreOverrides } from "@material-ui/core/styles/overrides";
import Spinner from "@material-ui/core/CircularProgress";

export interface Overrides extends CoreOverrides {
  // Define additional lab components here as needed....
  MUIDataTable?: { [key: string]: CSSProperties };
  MUIDataTableBodyCell?: { [key: string]: CSSProperties };
  MUIDataTableToolbar?: { [key: string]: CSSProperties };
  MUIDataTableHeadCell?: { [key: string]: CSSProperties };
  MUIDataTableBodyRow?: { [key: string]: CSSProperties };
}

const color = {
  white: "#ffffff",
  black: "#000000",
  black1: "#2e3638",
  violet: "#7b1fa2",
  blue1: "#0039d5cc",
  gray1: "#e5e5e5",
  gray2: "#8f8f8f"
};

const overrides: Overrides = {
  MUIDataTable: {
    paper: {
      width: "100%",
      boxShadow: "none",
      display: "flex",
      flexFlow: "column",
      minWidth: "985px",
      //@ts-ignore
      "& > table": {
        marginTop: "auto"
      }
    }
  },
  MUIDataTableBodyCell: {
    root: {}
  },
  MUIDataTableToolbar: {
    root: {
      color: color.violet
    }
  },
  MUIDataTableHeadCell: {
    fixedHeaderCommon: {
      backgroundColor: color.gray1
    },
    root: {
      padding: 0
    },
    toolButton: {
      justifyContent: "center",
      textAlign: "center"
    }
  },
  MuiTableCell: {
    root: {
      padding: ".4rem .8rem"
    }
  },
  MuiTableBody: {
    root: {
      borderLeft: "5px solid " + color.gray1,
      borderRight: "1px solid " + color.gray1
    }
  }
};

const theme = createMuiTheme({ overrides });

export interface MUIColumn {
  [key: string]: Omit<MUIDataTableColumn, 'name'> | string
}

export const createModel = (columns: MUIColumn ) => {
  const keys = Object.keys(columns);
  return {
    columns: keys.map( key => ({...(columns as any)[key], name: key })),
    getValueField: (field :string, rowData: any[]) => rowData[keys.findIndex(key=> key === field)],
    convertToRowData: (jsonData: any) => keys.map(key => jsonData[key]),
  }
}

const textLabels: MUIDataTableOptions["textLabels"] = {
  body: {
    noMatch: "No hay registros coincidentes",
    toolTip: "Ordenar"
    // columnHeaderTooltip: column => `Ordenar por ${column.name}`
  },
  pagination: {
    next: "Siguiente",
    previous: "Anterior",
    rowsPerPage: "",
    displayRows: "de"
  },
  toolbar: {
    search: "Buscar",
    downloadCsv: "Descargas CSV",
    print: "Imprimir",
    viewColumns: "Filtrar Columnas",
    filterTable: "Filtrar Tabla"
  },
  filter: {
    all: "Todos",
    title: "Filtros",
    reset: "Resetear"
  },
  viewColumns: {
    title: "Mostrar Columnas",
    titleAria: "Mostrar/Ocultar Columnas"
  },
  selectedRows: {
    text: "Fila(s) seleccionada(s)",
    delete: "Borrar",
    deleteAria: "Borrar filas seleccionadas"
  }
}

interface MUITable extends MUIDataTableProps {
  loading?: boolean;
  theme?: any;
}

export default ({
  title,
  columns,
  data,
  options,
  loading,
}: MUITable) => {
  return (
    <MuiThemeProvider theme={theme}>
      <MUIDataTable
        title={
          <span>
            { loading && <Spinner size="1rem" color="inherit" thickness={6} className="g-margin-right" /> }
            <b>
              {title}
            </b>
          </span>
        }
        columns={columns}
        data={data}
        options={{
          selectableRows: "none",
          print: false,
          download: false,
          textLabels,
          ...options,
        }}
      />
    </MuiThemeProvider>
  );
};