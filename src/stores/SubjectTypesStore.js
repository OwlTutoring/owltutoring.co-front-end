
const SubjectTypesStore = {
    data: {
        subjects: {
            subject: "",
            subList: [
              {
                subject: "English",
                subList: [
                  { 
                    subject: "Elementery",
                    subList: [
                      { subject: "Reading" },
                      { subject: "Writing" },
                      { subject: "Grammer" }
                    ]
                  },
                  {
                    subject: "Intermediate",
                    subList: [
                      {sub},
                      {}
                    ]
                  }
                ]
              },
              { 
                subject: "Math", 
                subList: [
                  { subject: "Elementry"},
                  { subject: "Intro to Pre Algebra"},
                  { subject: "Pre Algebra"},
                  { subject: "Algebra" },
                  { subject: "Algebra 2"},
                  { subject: "Geometry"},
                  { subject: "Pre Calculus"},
                  { 
                    subject: "Calculus",
                    subList: [
                      {subject: "AP Calculus AB"},
                      {subject: "AP Calculus BC"},
                      {subject: "Calculus 1"},
                      {subject: "Calculus 2"},
                      {subject: "Calculus 3"}
                    ]
                  },
                  {
                    subject:"statistics",
                    subList: [
                      {subject: "AP Statisctics"}
                    ]
                  }
                ] 
              },
              {
                subject: "Music",
                subList: [
                  {
                    subject: "Violin",
                    subList: [
                      { subject: "Begineer" },
                      { subject: "Intermediate" },
                      { subject: "Advanced" }
                    ]
                  },
                  {
                    subject: "Cello",
                    subList: [
                      { subject: "Begineer" },
                      { subject: "Intermediate" },
                      { subject: "Advanced" }
                    ]
                  }
                ]
              }
            ]
          }
    },
};

export default SubjectTypesStore;