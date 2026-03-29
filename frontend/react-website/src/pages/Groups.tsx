import React, { useState } from "react";
import StudyGroupCard from "../components/CreateStudyGroupCard";
import StudyGroupModal from "../components/StudyGroupModal";
import type { StudyGroupData, StudyGroupItem } from "../types/studyGroupData";

const Groups = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [groups, setGroups] = useState<StudyGroupItem[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroupItem | null>(
    null
  );

  const handleSaveGroup = (group: StudyGroupData) => {
    if (selectedGroup) {
      // EDIT
      setGroups((prev) =>
        prev.map((g) =>
          g.id === selectedGroup.id ? { ...group, id: g.id } : g
        )
      );
    } else {
      // CREATE
      setGroups((prev) => [...prev, { ...group, id: crypto.randomUUID() }]);
    }
  };

  const handleRemoveGroup = (id: string) => {
    setGroups((prev) => prev.filter((group) => group.id !== id));
  };

  const handleEditGroup = (group: StudyGroupItem) => {
    setSelectedGroup(group);
    setIsOpen(true);
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
              onRemove={handleRemoveGroup}
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
    </div>
  );
};

export default Groups;
