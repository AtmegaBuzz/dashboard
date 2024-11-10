// src/utils/didDocumentCreator.ts
import { v4 as uuidv4 } from 'uuid';

interface VerificationMethod {
  id: string;
  type: string;
  controller: string;
  blockchainAccountId: string;
}

interface Service {
  id: string;
  type: string;
  serviceEndpoint: string;
}

interface DIDDocumentMetadata {
  created: string;
  updated: string;
}

export interface DIDDocument {
  "@context": string[];
  id: string;
  controller: string;
  verificationMethod: VerificationMethod[];
  authentication: string[];
  assertionMethod?: string[];
  service?: Service[];
  created: string;
  updated: string;
  isAIAgent?: boolean;
  creator?: string;
}

export class DIDDocumentCreator {
  private static readonly CONTEXT = [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/secp256k1-2019/v1"
  ];

  /**
   * Creates a DID document for a user or AI agent
   * @param address The blockchain address of the entity
   * @param isAIAgent Whether the entity is an AI agent
   * @param creator The address of the creator (required for AI agents)
   * @returns The created DID document
   */
  static createDIDDocument(
    address: string,
    isAIAgent: boolean = false,
    creator?: string
  ): DIDDocument {
    if (isAIAgent && !creator) {
      throw new Error("Creator address is required for AI agent DID documents");
    }

    const timestamp = new Date().toISOString();
    const did = `did:p3ai:${isAIAgent ? 'agent' : 'user'}:${address.toLowerCase()}`;

    // Create verification method
    const verificationMethod: VerificationMethod = {
      id: `${did}#key-1`,
      type: "EcdsaSecp256k1RecoveryMethod2020",
      controller: did,
      blockchainAccountId: `eip155:1:${address.toLowerCase()}` // Change chain ID as needed
    };

    // Create basic DID document structure
    const didDocument: DIDDocument = {
      "@context": this.CONTEXT,
      id: did,
      controller: isAIAgent ? `did:p3ai:user:${creator!.toLowerCase()}` : did,
      verificationMethod: [verificationMethod],
      authentication: [`${did}#key-1`],
      created: timestamp,
      updated: timestamp,
      isAIAgent: isAIAgent,
    };

    // Add creator for AI agents
    if (isAIAgent) {
      didDocument.creator = creator;
      didDocument.assertionMethod = [`${did}#key-1`];
    }

    // Add default service endpoints based on entity type
    if (isAIAgent) {
      didDocument.service = [
        {
          id: `${did}#ai-service`,
          type: "AIService",
          serviceEndpoint: `https://api.p3ai.com/agents/${address.toLowerCase()}`
        },
        {
          id: `${did}#messaging`,
          type: "MessagingService",
          serviceEndpoint: `https://messaging.p3ai.com/agents/${address.toLowerCase()}`
        }
      ];
    } else {
      didDocument.service = [
        {
          id: `${did}#profile`,
          type: "ProfileService",
          serviceEndpoint: `https://profiles.p3ai.com/users/${address.toLowerCase()}`
        }
      ];
    }

    return didDocument;
  }

  /**
   * Updates an existing DID document
   * @param existingDocument The existing DID document
   * @param updates Partial updates to apply
   * @returns The updated DID document
   */
  static updateDIDDocument(
    existingDocument: DIDDocument,
    updates: Partial<DIDDocument>
  ): DIDDocument {
    const updatedDocument = {
      ...existingDocument,
      ...updates,
      updated: new Date().toISOString()
    };

    // Ensure immutable properties aren't changed
    updatedDocument.id = existingDocument.id;
    updatedDocument.created = existingDocument.created;
    updatedDocument.isAIAgent = existingDocument.isAIAgent;
    updatedDocument.creator = existingDocument.creator;

    return updatedDocument;
  }

  /**
   * Validates a DID document
   * @param document The DID document to validate
   * @returns True if valid, throws error if invalid
   */
  static validateDIDDocument(document: DIDDocument): boolean {
    // Check required fields
    if (!document.id || !document.controller || !document.verificationMethod) {
      throw new Error("Missing required DID document fields");
    }

    // Validate DID format
    if (!document.id.startsWith("did:p3ai:")) {
      throw new Error("Invalid DID format");
    }

    // Validate verification method
    if (document.verificationMethod.length === 0) {
      throw new Error("At least one verification method is required");
    }

    // Validate authentication
    if (!document.authentication || document.authentication.length === 0) {
      throw new Error("At least one authentication method is required");
    }

    // Additional validation for AI agents
    if (document.isAIAgent) {
      if (!document.creator) {
        throw new Error("Creator is required for AI agent DID documents");
      }
      if (!document.controller.startsWith("did:p3ai:user:")) {
        throw new Error("AI agent must be controlled by a user DID");
      }
    }

    return true;
  }
}