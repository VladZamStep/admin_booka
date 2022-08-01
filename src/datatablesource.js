export const userColumns = [
  { field: "_id", headerName: "ID", minWidth: 250 },
  {
    field: "user",
    headerName: "User",
    minWidth: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img
            || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 230,
  },

  {
    field: "country",
    headerName: "Country",
    minWidth: 150,
  },
  {
    field: "city",
    headerName: "City",
    minWidth: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    minWidth: 150,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", minWidth: 250 },
  {
    field: "name",
    headerName: "Name",
    minWidth: 300,
  },
  {
    field: "type",
    headerName: "Type",
    minWidth: 100,
  },
  {
    field: "title",
    headerName: "Title",
    minWidth: 300,
  },
  {
    field: "city",
    headerName: "City",
    minWidth: 150,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", minWidth: 250 },
  {
    field: "title",
    headerName: "Title",
    minWidth: 200,
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 300,
  },
  {
    field: "hotelName",
    headerName: "Hotel",
    minWidth: 300,
  },
  {
    field: "price",
    headerName: "Price",
    minWidth: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    minWidth: 120,
  },
];

export const subcribedEmails = [
  { field: "_id", headerName: "ID", minWidth: 250 },
  {
    field: "email",
    headerName: "Email",
    minWidth: 300,
  },
]