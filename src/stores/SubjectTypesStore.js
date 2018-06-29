
const MessageStore = {
    data: {
        subjects: {
            subject: "",
            subList: [
              { subject: "Math", subList: [{ subject: "Algebra" }] },
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

export default MessageStore;