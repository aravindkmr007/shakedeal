import {
  Button,
  Input,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";

import React, { useState } from "react";
import MaterialTable from "material-table";
function Teams() {
  const [Teams, setTeams] = useState([
      {
          name: "Team 1",
          Members: [
              {
                  name: "Aravindakuamr",
                  priority: 1,
                  task: [],
              },
              {
                  name: "Lolitha",
                  priority: 2,
                  task: [],
              },
              {
                  name: "Selvam",
                  priority: 3,
                  task: [],
              },
              {
                  name: "Saranaya",
                  priority: 2,
                  task: [],
              },
          ],
      },
      {
          name: "Team 2",
          Members: [
              {
                  name: "Santhosh",
                  priority: 1,
                  task: [],
              },
              {
                  name: "Sivan",
                  priority: 2,
                  task: [],
              },
              {
                  name: "Selvi",
                  priority: 3,
                  task: [],
              },
              {
                  name: "Varalaskhsmi",
                  priority: 2,
                  task: [],
              },
          ],
      },
  ]);
  const [Error, setError] = useState({
      ErrorTask: "",
  });
  const [Forms, setForm] = useState({
      taskname: "",
      selecttask: ""
  });
  const [Tasks, setTasks] = useState([
  ]);
  const handleOnchange = (e) => {
      setForm({ ...Forms, [[e.target.name]]: e.target.value });
  };
  const handlesubmit = (e) => {
      e.preventDefault();
      let already =
          Tasks.length > 0
              ? Tasks.find((e) => e.taskname == Forms.taskname)
              : false;
      if (!already && e.target.value !== "") {
          setTasks([
              ...Tasks,
              {
                  taskname: Forms.taskname,
              },
          ]);
          setForm({ ...Forms, taskname: "" })
      } else {
          setError({ ...Error, ErrorTask: e.target.value == "" ? "Required" : "Task is already there" });
      }
  };
  console.log(Teams, "Teams")
  let temp = Teams.map(e => {
      return e.Members.map(d => {
          return {
              ...d,
              count: d.task.length,
              team: e.name
          }
      })
  }).flat(1)
  let tabledata = temp.map((e) => {
      return {
          ...e,


      }
  })
  const RandomSelection = () => {
      let listofselecttask = ((Forms.selecttask))
      let joined = Teams.map(e => {
          return e.Members.map(d => {
              return {
                  ...d,
                  count: d.task.length,
                  team: e.name
              }
          })
      }).flat(1)
      let priorityfilter = joined.sort((a, b) => { return a.priority - b.priority })
      let countfilter = priorityfilter.sort((a, b) => { return a.count - b.count })
      let data = countfilter[0]
      let indexteam = Teams.findIndex(e => e.name == data.team)
      let indexemp = Teams[indexteam].Members.findIndex(e => e.name == data.name)
      let teams = Teams
      teams[indexteam].Members[indexemp].task.push(listofselecttask)
      setTeams(teams.map(e => e))
  }

  return (
      <div className="d-flex justify-content-center container-md card">
          <div className="row">
              <div className="col-6">
                  <div className="card-body">
                      <div className="card-header bg-white text-primary mb-3">Create Task</div>
                      <form class="row mt-3">
                          <div class="col-auto">
                              {/* <label for="inputPassword2" class="visually-hidden">Task Name</label> */}
                              <InputLabel htmlFor="input-with-icon-adornment">
                                  Task Name
                              </InputLabel>
                              <Input
                                  type="string"
                                  name="taskname"
                                  value={Forms.taskname}
                                  variant="outlined"
                                  onChange={(e) => handleOnchange(e)}
                                  error={Error.ErrorTask != "" ? true : false}
                              />
                          </div>
                          <div class="col-auto">
                              <Button variant="contained" color="primary" onClick={(e) => handlesubmit(e)}>Submit</Button>
                          </div>
                      </form>

                  </div>
              </div>
              <div className="col-6">
                  {Tasks.length > 0 ? (
                      <div className="card-body">
                          <div className="card-header bg-white text-primary mb-3">Assign Task</div>
                          <form class="row g-3 mt-2 mb-3">
                              {Tasks.length > 0 ? (
                                  <>
                                      <div class="col-auto">
                                          <InputLabel htmlFor="input-with-icon-adornment" className="mt-2">
                                              Select Task
                                          </InputLabel>
                                      </div>
                                      <div class="col-auto">
                                          <NativeSelect
                                              className="ml-2"
                                              name="selecttask"

                                              value={Forms.selecttask.taskname}
                                              variant="outlined"
                                              onChange={(e) => handleOnchange(e)}
                                          >
                                              <option key={"default"} value="Default"> Defualt</option>
                                              {
                                                  Tasks.map((e, i) => (
                                                      <option key={i} value={e.taskname}>{e.taskname}</option>
                                                  ))
                                              }

                                          </NativeSelect>


                                      </div>
                                  </>
                              ) : (
                                  ""
                              )}
                              {Forms.selecttask != "" ? (<div class="col-auto">
                                  <Button disabled={Forms.selecttask === "" ? true : false} variant="contained" color="primary" onClick={(e) => RandomSelection(e)}>
                                      Random Assign
                                  </Button>
                              </div>) : ("")}
                          </form>
                      </div>
                  ) : ("")}
              </div>
          </div>
          <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
          ></link>
          <MaterialTable
              title="Team List and  Task Assigned list"
              options={{
                  actionsColumnIndex: -1,
                  exportAllData: true,
                  exportButton: true,
                  columnResizable: true,
                  filtering: false,
                  sorting: true,
                  paging: true,
                  pageSize: 20, // make initial page size
                  emptyRowsWhenPaging: false, //to make page size fix in case of less data rows
                  pageSizeOptions: [6, 12, 20, 50],
                  headerStyle: {
                      // backgroundColor: '#8FD6E1',
                      // color: '#03256C',
                      fontSize: "14px",
                      fontWeight: "bold",
                  }, // rows selection options
                  cellStyle: {
                      // textAlign : "left",
                      fontSize: "14px",
                      // padding:"5px",
                  },
              }}
              columns={[
                  { title: "Name", field: "name" },
                  { title: "team", field: "team" },
                  { title: "priority", field: "priority" },
                  {
                      title: "task", field: "task", render: (rowData) => {
                          return rowData.task.toString();
                      },
                  }
              ]}
              data={tabledata.map((e) => e)}

          />

      </div>
  );
}

export default Teams;