#!/usr/bin/env node
import { Command } from 'commander';
import { संस्कृतसंकलक } from './index';
import { सुरक्षासंदर्भ } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';

const program = new Command();

program
    .name('samskrit')
    .description('Sanskrit Programming Language Compiler')
    .version('0.1.0');

program
    .command('compile')
    .description('Compile Sanskrit source code to JavaScript')
    .argument('<file>', 'Source file to compile')
    .option('-o, --output <file>', 'Output file path')
    .option('-w, --workspace <name>', 'Workspace name for security context')
    .option('--no-security', 'Disable security checks')
    .option('--no-obfuscation', 'Disable code obfuscation')
    .option('-s, --security-level <level>', 'Set security level (1-3)', '2')
    .option('--secure-tee', 'Enable Trusted Execution Environment')
    .option('--secure-storage', 'Enable secure storage for sensitive data')
    .option('--security-policy <file>', 'Path to security policy configuration')
    .action(async (file: string, options) => {
        try {
            const स्रोत = await fs.readFile(file, 'utf8');
            
            // Initialize compiler with security options
            const संकलक = new संस्कृतसंकलक({
                अस्पष्टीकरण: options.obfuscation !== false,
                सत्यापन: true,
                सुरक्षा: options.security !== false
            });

            // Load security policy if specified
            if (options.securityPolicy) {
                const नीतिविन्यास = JSON.parse(
                    await fs.readFile(options.securityPolicy, 'utf8')
                );
                संकलक.सुरक्षासंदर्भनिर्धारित(options.workspace || 'default', {
                    स्तर: parseInt(options.securityLevel),
                    अनुमतियां: नीतिविन्यास.permissions || [],
                    प्रतिबंध: नीतिविन्यास.restrictions || []
                });
            } else {
                // Use default security context
                संकलक.सुरक्षासंदर्भनिर्धारित(options.workspace || 'default', {
                    स्तर: parseInt(options.securityLevel),
                    अनुमतियां: ['readFile', 'writeFile'],
                    प्रतिबंध: ['eval', 'execSync', 'Function']
                });
            }

            // Compile the code
            const जावास्क्रिप्ट = await संकलक.संकलन(स्रोत, options.workspace);

            // Write output
            const आउटपुट = options.output || file.replace(/\.(sk|संस्कृत)$/, '.js');
            await fs.writeFile(आउटपुट, जावास्क्रिप्ट);
            
            console.log(`✓ Compiled successfully: ${आउटपुट}`);

            // Output security report if enabled
            if (options.security !== false) {
                console.log('\nSecurity Report:');
                const सुरक्षालॉग = संकलक.सुरक्षाघटनालॉगप्राप्तकरें();
                if (सुरक्षालॉग.length > 0) {
                    console.log('Security Events:');
                    सुरक्षालॉग.forEach(घटना => {
                        console.log(`- [${घटना.प्रकार}] ${घटना.संदेश}`);
                    });
                } else {
                    console.log('✓ No security issues found');
                }
            }

        } catch (त्रुटि) {
            console.error('Compilation failed:', (त्रुटि as Error).message);
            process.exit(1);
        }
    });

program
    .command('init-security')
    .description('Initialize security configuration for a workspace')
    .argument('<workspace>', 'Workspace name')
    .option('-l, --level <level>', 'Security level (1-3)', '2')
    .option('-p, --policy <file>', 'Output policy file path', 'security-policy.json')
    .action(async (workspace: string, options) => {
        try {
            const नीतिविन्यास = {
                workspace,
                level: parseInt(options.level),
                permissions: [
                    'readFile',
                    'writeFile',
                    'crypto.randomBytes',
                    'crypto.createCipheriv',
                    'crypto.createDecipheriv'
                ],
                restrictions: [
                    'eval',
                    'Function',
                    'execSync',
                    'child_process',
                    'http.request'
                ],
                hardware: {
                    tee: true,
                    secureStorage: true,
                    tpm: true
                }
            };

            await fs.writeFile(
                options.policy,
                JSON.stringify(नीतिविन्यास, null, 2)
            );

            console.log(`✓ Security policy initialized: ${options.policy}`);
            console.log(`  Workspace: ${workspace}`);
            console.log(`  Security Level: ${options.level}`);

        } catch (त्रुटि) {
            console.error('Failed to initialize security:', (त्रुटि as Error).message);
            process.exit(1);
        }
    });

program
    .command('verify')
    .description('Verify security of compiled code')
    .argument('<file>', 'JavaScript file to verify')
    .option('-p, --policy <file>', 'Security policy file')
    .option('-l, --level <level>', 'Minimum security level (1-3)', '2')
    .action(async (file: string, options) => {
        try {
            const कोड = await fs.readFile(file, 'utf8');
            const संकलक = new संस्कृतसंकलक({
                अस्पष्टीकरण: false, // Add missing required parameter
                सुरक्षा: true,
                सत्यापन: true
            });

            // Load security policy if specified
            if (options.policy) {
                const नीतिविन्यास = JSON.parse(
                    await fs.readFile(options.policy, 'utf8')
                );
                संकलक.सुरक्षासंदर्भनिर्धारित('verify', {
                    स्तर: parseInt(options.level),
                    अनुमतियां: नीतिविन्यास.permissions || [],
                    प्रतिबंध: नीतिविन्यास.restrictions || []
                });
            }

            // Verify the code with both required parameters
            const वाक्यवृक्ष = await संकलक.विश्लेषण(कोड);
            await संकलक.सुरक्षा.संकलनपश्चातसत्यापन(कोड, वाक्यवृक्ष);
            
            console.log('✓ Code verification passed');
            const सुरक्षालॉग = संकलक.सुरक्षाघटनालॉगप्राप्तकरें();
            if (सुरक्षालॉग.length > 0) {
                console.log('\nSecurity Events:');
                सुरक्षालॉग.forEach(घटना => {
                    console.log(`- [${घटना.प्रकार}] ${घटना.संदेश}`);
                });
            }

        } catch (त्रुटि: unknown) { // Add type annotation
            console.error('Verification failed:', त्रुटि instanceof Error ? त्रुटि.message : String(त्रुटि));
            process.exit(1);
        }
    });

program.parse();