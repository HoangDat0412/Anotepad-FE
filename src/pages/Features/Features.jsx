import React from 'react'
import "./feature.scss"
export default function Features() {
  return (
    <div className='container feature'>
      <div class="displayContent">
        {/* <h2>Feature Request</h2> */}
        {/* <div>
          <a style={{color:"#10589b"}} ><b>Feedback Forum</b></a> - We'd love to hear your ideas, thoughts, and suggestions. Please submit your feedback or feature requests through our feedback forum.
        </div> */}

        <h2 class="bard-hello">Getting Started</h2>
        <ul>
          <li>
            <b>Guest User:</b> Stay anonymous and save notes without signing
            in. You can come back and edit your notes at anytime as long as you don't
            delete your browser cookies.
          </li>
          <li>
            <b>Registered User:</b> Sign up for a FREE account so you can save your notes
            as private notes and log back in from anywhere to edit them.
          </li>
        </ul>

        <h2>
          Here is a list of neat things you can do with <a href="/" class="bard-hello" title="A Free Online Notepad">Anotepad</a>
        </h2>
        <ul>
          <li>Save notes without creating an account. All your notes will be "Public" and you can only edit them from the same web browser</li>
          <li>Register a free account and save notes as either "Public", "Private", or "Password Protected"</li>
          <li>Easily share notes via Twitter, Facebook etc.</li>
          <li>Use a powerful HTML editor to enhance the way your notes look</li>
          <li>Create multiple folders to organize your notes and sort your notes by date or title</li>
          <li>Download your notes in PDF, MS Word, ODT, and Text format</li>
          <li>Focus on your work without the need of keep saving your notes with Auto-save feature</li>
          <li>Quickly browse through your notes with the note preview button</li>
          <li>Make your note Password Protected so only people with password can read your note</li>
          <li>Set an editor's password on your note so multiple people can edit a single note</li>
          <li>Set customized time zone, auto-save note option, and new note default access in Settings page</li>
          <li>Download all notes in Zip archive from Settings page</li>
          <li>Enable or disable note commenting in Settings page</li>
          <li>Set color theme to Light, Warm, and Dark in Settings page</li>
          <li>Import from Word and PDF document and turn it into a note</li>
          <li>Set fixed width font for plain text note in Settings page</li>
          <li>Create checklists with note type dropdown</li>
          <li>Share all public notes in a folder through folder sharing</li>
          <li>[New] Record and attach audio to notes</li>
        </ul>

        <h2>Why use aNotepad? Here are some ideas</h2>
        <ul>
          <li>Save notes and access it from any location at any time</li>
          <li>Create To-Do Lists</li>
          <li>Use it as a daily diary to record each day's events</li>
          <li>Store shopping list</li>
          <li>Take class notes and share and collaborate with others</li>
        </ul>

        <h2>More on How To Use aNotepad.com - a free online notes editor</h2>
        <p>
          aNotepad.com is an online text editor that gives web user a simple tool to take and share notes online.
          User notes are saved through a secure internet connection to our cloud servers. aNotepad.com is free and
          can be accessed from anywhere at any time.
        </p>
        <p><b>Note Permission</b></p>
        <p>When you share your note as an online web page with others. You can set note permission to control who can see your note.</p>
        <ul>
          <li>Private Note - Only you can read and edit</li>
          <li>Public Note - Everyone who knows the URL can read</li>
          <li>Password Protected Note - Only people with password can read</li>
        </ul>
        <p>If you enable Guest Edit option on your note, people with note editing password can also edit your note at anotepad.com website.</p>

        <p><b>Note Types</b></p>
        <p>You can create your note as one of the following types and switch among them</p>
        <ul>
          <li>Plain Text Note - Text note without formatting. Plain text note can use fixed width font as well</li>
          <li>Rich Text Note - Text note with rich text formatting and the option to embed link, tables, and images</li>
          <li>Task List - An itemized list with checkbox to mark the status of each item</li>
        </ul>

        <p><b>Note Sharing Options</b></p>
        <p>You can download and share your notes in multiple ways</p>
        <ul>
          <li>Download Note - You can download your note in TXT, PDF, and Word Format to share it</li>
          <li>Note Webpage - You can share the unique URL to your note through social media</li>
          <li>Email Note - You can send your note in email body or as attachment to others</li>
        </ul>

        <p><b>Organizing Notes</b></p>
        <p>You can organize your notes into folders</p>
        <ul>
          <li>All Notes - This folder shows all notes you have. </li>
          <li>Inbox - This is the default folder for new notes and lists all notes that are not moved to a user folder.</li>
          <li>User Folders - You can create multiple folders and move your notes from inbox to user folders to categorize them</li>
        </ul>
        <p>You can also sort notes within a folder and search notes by keyword across all folders.</p>

        <p>
          If you have any questions or any other ideas on improving aNotepad, please send an email at <a href="mailto:hoang2811dat@gmail.com">hoang2811dat@gmail.com</a>.
          We'd love to hear from you!
        </p>
      </div>
    </div>
  )
}
