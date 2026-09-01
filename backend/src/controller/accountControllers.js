import Account from "../models/account.js";

// export async function getNotes(req, res) {

//     try {
//         const note = await Note.find().sort({createdAt: -1});
//         if (!note) {
//             return res.status(404).json({ message: "No notes found!" });
//         } else { 
//             res.json(note); 
//         } 
//     } catch (error) {
//         console.error("Error fetching notes:", error);
//         res.status(500).json({ message: "Server Error!" });
//     }
// }

// export async function getNoteById(req, res) {
//     try {
//         const notes = await Note.findById(req.params.id);
//         if (!notes) {
//             return res.status(404).json({ message: "Note ID not found!" });
//         }
//         res.status(200).json(notes);
//     } catch (error){
//         console.error("Error fetching note:", error);
//         res.status(500).json({ message: "Server Error!" });
//     }
// }
export async function createAccount(req, res) {
    try {
        const { title, content } = req.body;
        const account = new Account({email, password});

        const newAccount = await account.save();

        res.status(201).json(newAccount);
    } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ message: "Server Error!" });
    }
}

export async function updateAccount(req, res) {
    try {
        const { email, password } = req.body;
        const updatedAccount = await Account.findByIdAndUpdate(req.params.id, { email, password }, { new: true });

        if (!updatedAccount) {
            return res.status(404).json({ message: "Account ID not found!" });
        }
        res.status(200).json({message: "Account updated successfully!"});
    } catch (error) {
        console.error("Error updating Account:", error);
        res.status(500).json({ message: "Server Error!" });
    }
}

export async function deleteAccount(req, res) {
    try {
        const deletedAccount = await Account.findByIdAndDelete(req.params.id);
        if (!deletedAccount) {
            return res.status(404).json({ message: "Account ID not found!" });
        }
        res.status(200).json({message: "Account deleted successfully!"});
    } catch (error) {
        console.error("Error deleting Account:", error);
        res.status(500).json({ message: "Server Error!" });
    }
}
