-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `name` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
