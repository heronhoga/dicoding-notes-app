const notesData = [
  {
    id: "notes-jT-jjsyz61J8XKiI",
    title: "Welcome to Notes, Dimas!",
    body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
    createdAt: "2022-07-28T10:03:12.594Z",
    archived: false,
  },
  {
    id: "notes-aB-cdefg12345",
    title: "Meeting Agenda",
    body: "Discuss project updates and assign tasks for the upcoming week.",
    createdAt: "2022-08-05T15:30:00.000Z",
    archived: false,
  },
  {
    id: "notes-XyZ-789012345",
    title: "Shopping List",
    body: "Milk, eggs, bread, fruits, and vegetables.",
    createdAt: "2022-08-10T08:45:23.120Z",
    archived: false,
  },
  {
    id: "notes-1a-2b3c4d5e6f",
    title: "Personal Goals",
    body: "Read two books per month, exercise three times a week, learn a new language.",
    createdAt: "2022-08-15T18:12:55.789Z",
    archived: false,
  },
  {
    id: "notes-LMN-456789",
    title: "Recipe: Spaghetti Bolognese",
    body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
    createdAt: "2022-08-20T12:30:40.200Z",
    archived: false,
  },
  {
    id: "notes-QwErTyUiOp",
    title: "Workout Routine",
    body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
    createdAt: "2022-08-25T09:15:17.890Z",
    archived: false,
  },
  {
    id: "notes-abcdef-987654",
    title: "Book Recommendations",
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: "2022-09-01T14:20:05.321Z",
    archived: false,
  },
  {
    id: "notes-zyxwv-54321",
    title: "Daily Reflections",
    body: "Write down three positive things that happened today and one thing to improve tomorrow.",
    createdAt: "2022-09-07T20:40:30.150Z",
    archived: false,
  },
  {
    id: "notes-poiuyt-987654",
    title: "Travel Bucket List",
    body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
    createdAt: "2022-09-15T11:55:44.678Z",
    archived: false,
  },
  {
    id: "notes-asdfgh-123456",
    title: "Coding Projects",
    body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
    createdAt: "2022-09-20T17:10:12.987Z",
    archived: false,
  },
  {
    id: "notes-5678-abcd-efgh",
    title: "Project Deadline",
    body: "Complete project tasks by the deadline on October 1st.",
    createdAt: "2022-09-28T14:00:00.000Z",
    archived: false,
  },
  {
    id: "notes-9876-wxyz-1234",
    title: "Health Checkup",
    body: "Schedule a routine health checkup with the doctor.",
    createdAt: "2022-10-05T09:30:45.600Z",
    archived: false,
  },
  {
    id: "notes-qwerty-8765-4321",
    title: "Financial Goals",
    body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
    createdAt: "2022-10-12T12:15:30.890Z",
    archived: false,
  },
  {
    id: "notes-98765-54321-12345",
    title: "Holiday Plans",
    body: "Research and plan for the upcoming holiday destination.",
    createdAt: "2022-10-20T16:45:00.000Z",
    archived: false,
  },
  {
    id: "notes-1234-abcd-5678",
    title: "Language Learning",
    body: "Practice Spanish vocabulary for 30 minutes every day.",
    createdAt: "2022-10-28T08:00:20.120Z",
    archived: false,
  },
];

class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["id", "title", "body", "createdat", "archived"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const id = this.getAttribute("id");
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    const createdAt = this.getAttribute("createdat");
    const archived = this.getAttribute("archived") === "true" ? "Yes" : "No";

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: white;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          font-family: sans-serif;
        }
        h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
        }
        p {
          margin: 0.25rem 0;
          white-space: pre-wrap;
        }
        .meta {
          font-size: 0.9rem;
          color: #555;
        }
      </style>
      <div class="card">
        <h3>${title}</h3>
        <p>${body}</p>
        <p class="meta"><strong>ID:</strong> ${id}</p>
        <p class="meta"><strong>Created At:</strong> ${new Date(
          createdAt
        ).toLocaleString()}</p>
        <p class="meta"><strong>Archived:</strong> ${archived}</p>
      </div>
    `;
  }
}

customElements.define("note-card", NoteCard);

const container = document.getElementById("notes-container");

if (container) {
  notesData.forEach((note) => {
    createNoteElement(
      note.title,
      note.body,
      note.id,
      note.createdAt,
      note.archived
    );
  });
}

function createNoteElement(
  title,
  body,
  id = null,
  createdAt = null,
  archived = false
) {
  const note = document.createElement("note-card");
  note.setAttribute("title", title);
  note.setAttribute("body", body);
  note.setAttribute("id", id ?? `notes-${Date.now()}`);
  note.setAttribute("createdat", createdAt ?? new Date().toISOString());
  note.setAttribute("archived", archived.toString());
  container.appendChild(note);
}

const form = document.getElementById("note-form");
const titleInput = document.getElementById("note-title");
const bodyInput = document.getElementById("note-body");

if (form && titleInput && bodyInput) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    const titleError = document.getElementById("title-error");
    const bodyError = document.getElementById("body-error");

    let isValid = true;

    titleError.textContent = "";
    bodyError.textContent = "";

    if (title.length < 3) {
      titleError.textContent = "Judul minimal 3 huruf.";
      isValid = false;
    }

    if (body.length < 5) {
      bodyError.textContent = "Isi catatan minimal 5 huruf.";
      isValid = false;
    }

    if (!isValid) return;

    createNoteElement(title, body);
    titleInput.value = "";
    bodyInput.value = "";
  });
}
