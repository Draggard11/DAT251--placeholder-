import { useState } from "react"
import {getStudents} from "../services/StudentService"

const DEMO_STUDENT_NAME = "Aksel"

export default function DemoPool() {
  const [students, setStudents] = useState<any[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [groups, setGroups] = useState<any[]>([])
  const [poolCreated, setPoolCreated] = useState(false)
  const [requestSubmitted, setRequestSubmitted] = useState(false)
  const [groupsGenerated, setGroupsGenerated] = useState(false)
  
  const createPoolDemo = async () => {
    try {
      let res = await fetch(
        "http://localhost:8080/api/groupgeneration/pool/create",
        {
          method: "POST",
        },
      );
      let res2 = await fetch(
        "http://localhost:8080/api/groupgeneration/pool/seed?count=10",
        {
          method: "POST",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to create pool");
      } else {
        console.log("DEMO: pool created");
      }

      if (!res2.ok) {
        throw new Error("Failed to seed students");
      } else {
        console.log("DEMO: students created and empty requests added to pool");
      }
       const fetchedStudents = await getStudents()
       setStudents(fetchedStudents)
       setPoolCreated(true)
    } catch (err) {
      console.error("Failed", err);
    }
  };

  const toggleStudent = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const submitRequest = async () => {
    try {
        const studentRes = await fetch("http://localhost:8080/api/students", 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: DEMO_STUDENT_NAME })
            })
        const newStudent = await studentRes.json()

        const res = await fetch(
        "http://localhost:8080/api/groupgeneration/pool/join",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: newStudent.id,
            preferredStudentIds: selectedIds
          })
        })
        if (!res.ok) throw new Error("failed to join pool")
        console.log("DEMO: Request submitted")
        setRequestSubmitted(true)
    } catch (err) {
        console.log("Failed", err)
    }
  }

  const generateGroups = async () => {
    try {
        const res = await fetch(
             "http://localhost:8080/api/groupgeneration/pool/generate",
            { method: "POST" }
        )
        if (!res.ok) throw new Error("Failed to generate groups")

         const res2 = await fetch(
            "http://localhost:8080/api/groupgeneration/pool/groups"
        )
        const data = await res2.json()
        setGroups(data)
        setGroupsGenerated(true)
        } catch (err) {
            console.log("Failed", err)
        }
    }


  return (
    <div style={{
            maxHeight: "800px",
            overflowY: "auto",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "12px 16px",
            backgroundColor: "white",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
            marginTop: "24px",
            }}>
        <h1>
            DEMO: Group generation
        </h1>
        <div style={{
            padding: "12px 16px",
            backgroundColor: "white",
            marginTop: "24px",
            }}>
            <h2>
                Step 1: Create Request-Pool
            </h2>
            <button 
                onClick={() => createPoolDemo()}
                disabled={poolCreated}
                style={poolCreated ? buttonDoneStyle : buttonStyle}
                >
                {poolCreated ? "✓ Pool Created" : "Step 1: Create Demo Pool"}
            </button>
        </div>
        {/* Step 2 */}
        {students.length > 0 && (
            <div style={{
                padding: "12px 16px",
                backgroundColor: "white",
                marginTop: "24px",
                }}>
            <h2>Step 2: Submit Your Request</h2>
            <div style={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "3px",
                borderColor: "lightgray",
                borderRadius: "12px",
                padding: "12px 16px",
                backgroundColor: "white",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
                marginTop: "24px",
                }}>
                <p>Select preferred groupmates (optional):</p>
                {students
                    .filter(student => student.name !== DEMO_STUDENT_NAME)
                    .map(student => (
                        <div key={student.id} style={{ marginBottom: "8px" }}>
                        <label>
                            <input
                            type="checkbox"
                            checked={selectedIds.includes(student.id)}
                            onChange={() => toggleStudent(student.id)}
                            style={{ marginRight: "8px" }}
                            />
                            {student.name}
                        </label>
                        </div>
                    ))}
            </div>
            <button 
            onClick={submitRequest}
            disabled={requestSubmitted}
            style={requestSubmitted ? buttonDoneStyle : buttonStyle}
            >
                {requestSubmitted ? "✓ Request Submitted" : "Submit Request as" + DEMO_STUDENT_NAME}
            </button>
            </div>
        )}

        {/* Step 3 */}
        {students.length > 0 && (
            <div style={{
                padding: "12px 16px",
                backgroundColor: "white",
                marginTop: "24px",
                }}>
            <h2>Step 3: Generate Groups</h2>
            <button 
                onClick={generateGroups}
                disabled={groupsGenerated}
                style={groupsGenerated ? buttonDoneStyle : buttonStyle}
                >
                {groupsGenerated ? "✓ Groups Generated" : "Generate Groups"}
            </button>
            </div>
        )}

        {/* Step 4: Display groups as cards */}
        {groups.length > 0 && (
            <div style={{ marginTop: "24px" }}>
            <h2>Generated Groups</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {groups.map((group, index) => (
                <div key={group.id} style={cardStyle}>
                    <h3 style={{ marginTop: 0 }}>Group {index + 1}</h3>
                    {group.students.map((student: any) => (
                    <p key={student.id} style={{ margin: "4px 0" }}>
                        {student.name}
                    </p>
                    ))}
                </div>
                ))}
            </div>
            </div>
        )}
        </div>

  );
}

const buttonStyle = {
  padding: "12px 20px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
}

const buttonDoneStyle = {
  ...buttonStyle,
  backgroundColor: "#16a34a",
  cursor: "default",
}

const cardStyle = {
  padding: "16px",
  borderRadius: "12px",
  backgroundColor: "#f1f5f9",
  minWidth: "150px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
}
