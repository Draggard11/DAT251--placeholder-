import React, { useState, useEffect } from "react";
import StudyGroupCard from "../components/CreateStudyGroupCard";
import StudyGroupModal from "../components/StudyGroupModal";
import type { StudyGroupData, StudyGroupItem } from "../types/studyGroupData";
import CreateSessionModal from "../components/CreateSessionModal";

const Groups = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [groups, setGroups] = useState<StudyGroupItem[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroupItem | null>(
    null
  );
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [selectedGroupForSession, setSelectedGroupForSession] =
    useState<StudyGroupItem | null>(null);

  const fetchGroups = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/studygroups");
      const data = await res.json();

      setGroups(
        data.map((group: any) => ({
          id: String(group.id),
          groupName: group.name,
          subject: "",
          description: "",
          link: "",
        }))
      );
    } catch (err) {
      console.error("Failed to fetch groups:", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSaveGroup = async (group: StudyGroupData) => {
    try {
      let res: Response;

      if (selectedGroup) {
        // EDIT
        res = await fetch(
          `http://localhost:8080/api/studygroups/${selectedGroup.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: group.groupName,
            }),
          }
        );
      } else {
        // CREATE
        res = await fetch("http://localhost:8080/api/studygroups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: group.groupName,
          }),
        });
      }

      if (!res.ok) {
        throw new Error("Failed to save group");
      }

      await fetchGroups();
      setIsOpen(false);
      setSelectedGroup(null);
    } catch (err) {
      console.error("Failed to save group:", err);
    }
  };

  const handleDeleteGroup = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/studygroups/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete group");
      }
      await fetchGroups();
    } catch (err) {
      console.error("Failed to remove group:", err);
    }
  };

  const handleEditGroup = (group: StudyGroupItem) => {
    setSelectedGroup(group);
    setIsOpen(true);
  };

  const handleCreateSession = (group: StudyGroupItem) => {
    setSelectedGroupForSession(group);
    setIsSessionModalOpen(true);
  };

  return (
    <div
      style={{
        padding: "40px 32px",
        width: "100%",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Study Groups</h2>
            <p style={{ margin: 0, color: "#666" }}>
              Join or create a study group to collaborate with others.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            style={{
              padding: "12px 20px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              cursor: "pointer",
            }}
          >
            Create Group
          </button>
        </div>

        {/* CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {groups.map((group) => (
            <StudyGroupCard
              key={group.id}
              group={group}
              onEdit={handleEditGroup}
              onRemove={handleDeleteGroup}
              onCreateSession={handleCreateSession}
            />
          ))}
        </div>
      </div>

      <StudyGroupModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedGroup(null);
        }}
        onSave={handleSaveGroup}
        initialData={selectedGroup}
      />

      <CreateSessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        onSave={async (session) => {
          try {
            const today = new Date().toISOString().split("T")[0];

            const start = new Date(`${today}T${session.startTime}:00`);
            const end = new Date(`${today}T${session.endTime}:00`);

            const res = await fetch("http://localhost:8080/api/studySessions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                subject: session.subject || null,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
                completed: false,
                studyGroup: session.groupId
                  ? { id: Number(session.groupId) }
                  : null,
              }),
            });

            if (!res.ok) {
              throw new Error("Failed to create session");
            }

            const data = await res.json();
            console.log("Session created:", data);

            setIsSessionModalOpen(false);
            setSelectedGroupForSession(null);
          } catch (err) {
            console.error("Failed to create session:", err);
          }
        }}
        type="group"
        group={
          selectedGroupForSession
            ? {
                id: selectedGroupForSession.id,
                name: selectedGroupForSession.groupName,
                subject: selectedGroupForSession.subject,
              }
            : undefined
        }
      />
    </div>
  );
};

export default Groups;
