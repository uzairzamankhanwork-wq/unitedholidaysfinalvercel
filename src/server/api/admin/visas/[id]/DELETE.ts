import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { visas } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

/**
 * DELETE /api/admin/visas/:id
 * Delete a visa service
 */
export default async function handler(req: Request, res: Response) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Visa ID is required',
      });
    }

    // Delete the visa
    await db.delete(visas).where(eq(visas.id, parseInt(id)));

    res.json({
      success: true,
      message: 'Visa deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting visa:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete visa',
      message: String(error),
    });
  }
}
