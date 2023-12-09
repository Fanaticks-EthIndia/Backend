const Events = require("../models/events");
async function handleEventCreation(req, res) {
    try {
        const eventData = req.body;
        console.log(eventData);
        const result = await Events.create(eventData);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// async function handleResourceDeletion(req, res) {
//   const itemId = req.params.id;
//   try {
//     await Resources.findByIdAndDelete(itemId);
//     res.status(204).send("Done");
//   } catch (error) {
//     console.error('Error deleting item:', error);
//     res.status(500).json({ error: 'Failed to delete item' });
//   }
// }

// async function handleResourceUpdation(req, res) {
//   const itemId = req.params.id;
//   const updatedData = req.body;

//   try {
//     const updatedItem = await Resources.findByIdAndUpdate(itemId, updatedData, { new: true });

//     if (!updatedItem) {
//       return res.status(404).json({ error: 'Item not found' });
//     }
//     res.status(200).json(updatedItem);

//   } catch (error) {
//     console.error('Error updating item:', error);
//     res.status(500).json({ error: 'Failed to update item' });
//   }
// };

module.exports = {
  handleEventCreation,
//   handleResourceDeletion,
//   handleResourceUpdation
};